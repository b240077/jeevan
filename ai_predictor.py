#!/usr/bin/env python3
"""
AI Predictor for Waterborne Disease Outbreak Prediction
Uses the trained Keras model to predict disease outbreaks based on various factors
"""

import sys
import json
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
import warnings
warnings.filterwarnings('ignore')

try:
    import tensorflow as tf
    from tensorflow import keras
    TENSORFLOW_AVAILABLE = True
except ImportError:
    TENSORFLOW_AVAILABLE = False
    print("TensorFlow not available. Using fallback predictions.")

class WaterborneAIPredictor:
    def __init__(self, model_path="waterborne_disease_ai.keras"):
        self.model_path = model_path
        self.model = None
        self.feature_names = [
            'temperature', 'humidity', 'rainfall', 'water_ph', 'water_turbidity',
            'water_bacteria_count', 'population_density', 'sanitation_score',
            'previous_cases', 'season_monsoon', 'season_winter', 'season_summer'
        ]
        self.load_model()
    
    def load_model(self):
        """Load the trained Keras model"""
        try:
            if TENSORFLOW_AVAILABLE:
                self.model = keras.models.load_model(self.model_path)
                print(f"Successfully loaded Keras model from {self.model_path}")
            else:
                print("TensorFlow not available. Using statistical fallback.")
                self.model = None
        except Exception as e:
            print(f"Error loading model: {e}")
            print("Using statistical fallback predictions.")
            self.model = None
    
    def prepare_features(self, input_data):
        """Prepare input features for the model"""
        # Default values based on typical Northeast India conditions
        defaults = {
            'temperature': 25.0,  # Celsius
            'humidity': 80.0,     # Percentage
            'rainfall': 150.0,    # mm per month
            'water_ph': 7.0,
            'water_turbidity': 2.0,  # NTU
            'water_bacteria_count': 0,
            'population_density': 300,  # per sq km
            'sanitation_score': 6.0,    # out of 10
            'previous_cases': 5,
            'season_monsoon': 0,
            'season_winter': 0,
            'season_summer': 0
        }
        
        # Update with provided data
        for key, value in input_data.items():
            if key in defaults:
                defaults[key] = float(value)
        
        # Set season based on current month
        current_month = datetime.now().month
        if current_month in [6, 7, 8, 9]:  # Monsoon season
            defaults['season_monsoon'] = 1
        elif current_month in [12, 1, 2]:  # Winter season
            defaults['season_winter'] = 1
        else:  # Summer season
            defaults['season_summer'] = 1
        
        # Create feature array in the correct order
        features = np.array([[defaults[name] for name in self.feature_names]])
        return features
    
    def predict_outbreak_risk(self, input_data):
        """Predict outbreak risk using the Keras model or fallback"""
        features = self.prepare_features(input_data)
        
        if self.model is not None and TENSORFLOW_AVAILABLE:
            try:
                # Use the actual Keras model
                prediction = self.model.predict(features, verbose=0)
                risk_probability = float(prediction[0][0])
                
                # Convert to risk categories
                if risk_probability > 0.7:
                    risk_level = "high"
                    risk_score = min(95, int(risk_probability * 100))
                elif risk_probability > 0.4:
                    risk_level = "medium"
                    risk_score = min(70, int(risk_probability * 100))
                else:
                    risk_level = "low"
                    risk_score = max(10, int(risk_probability * 100))
                
                confidence = min(95, int(risk_probability * 100 + 10))
                
            except Exception as e:
                print(f"Error during model prediction: {e}")
                return self._fallback_prediction(input_data)
        else:
            return self._fallback_prediction(input_data)
        
        return {
            "risk_level": risk_level,
            "risk_score": risk_score,
            "confidence": confidence,
            "risk_probability": risk_probability
        }
    
    def _fallback_prediction(self, input_data):
        """Fallback prediction using statistical rules"""
        risk_score = 20  # Base risk
        
        # Water quality factors
        water_ph = input_data.get('water_ph', 7.0)
        if water_ph < 6.5 or water_ph > 8.5:
            risk_score += 15
        
        water_turbidity = input_data.get('water_turbidity', 2.0)
        if water_turbidity > 4:
            risk_score += 20
        
        bacteria_count = input_data.get('water_bacteria_count', 0)
        if bacteria_count > 0:
            risk_score += 25
        
        # Environmental factors
        rainfall = input_data.get('rainfall', 150.0)
        if rainfall > 200:  # Heavy rainfall increases risk
            risk_score += 15
        
        humidity = input_data.get('humidity', 80.0)
        if humidity > 85:
            risk_score += 10
        
        # Previous cases
        previous_cases = input_data.get('previous_cases', 5)
        if previous_cases > 10:
            risk_score += 20
        elif previous_cases > 5:
            risk_score += 10
        
        # Sanitation score (lower is worse)
        sanitation_score = input_data.get('sanitation_score', 6.0)
        if sanitation_score < 5:
            risk_score += 20
        elif sanitation_score < 7:
            risk_score += 10
        
        # Season factor
        current_month = datetime.now().month
        if current_month in [6, 7, 8, 9]:  # Monsoon season
            risk_score += 15
        
        # Cap the risk score
        risk_score = min(95, max(5, risk_score))
        
        # Determine risk level
        if risk_score > 70:
            risk_level = "high"
        elif risk_score > 40:
            risk_level = "medium"
        else:
            risk_level = "low"
        
        return {
            "risk_level": risk_level,
            "risk_score": risk_score,
            "confidence": 85,
            "risk_probability": risk_score / 100.0
        }
    
    def predict_seasonal_trends(self, input_data):
        """Predict seasonal disease trends"""
        current_date = datetime.now()
        predictions = []
        
        for i in range(12):  # Next 12 months
            future_date = current_date + timedelta(days=30 * i)
            month = future_date.month
            
            # Seasonal risk factors
            base_risk = 20
            
            if month in [6, 7, 8, 9]:  # Monsoon season
                seasonal_risk = base_risk + 30
                season_name = "Monsoon"
            elif month in [10, 11]:  # Post-monsoon
                seasonal_risk = base_risk + 20
                season_name = "Post-Monsoon"
            elif month in [12, 1, 2]:  # Winter
                seasonal_risk = base_risk + 5
                season_name = "Winter"
            else:  # Summer
                seasonal_risk = base_risk + 15
                season_name = "Summer"
            
            # Add water quality impact
            water_quality_impact = 0
            if input_data.get('water_bacteria_count', 0) > 0:
                water_quality_impact = 15
            if input_data.get('water_turbidity', 2.0) > 4:
                water_quality_impact += 10
            
            total_risk = min(95, seasonal_risk + water_quality_impact)
            
            predictions.append({
                "month": future_date.strftime("%B %Y"),
                "season": season_name,
                "risk_score": total_risk,
                "risk_level": "high" if total_risk > 70 else "medium" if total_risk > 40 else "low"
            })
        
        return predictions
    
    def get_disease_specific_predictions(self, input_data):
        """Get predictions for specific waterborne diseases"""
        base_prediction = self.predict_outbreak_risk(input_data)
        
        diseases = {
            "cholera": {
                "risk_multiplier": 1.2 if input_data.get('water_bacteria_count', 0) > 0 else 0.8,
                "seasonal_peak": [6, 7, 8, 9],  # Monsoon months
                "description": "Acute diarrheal infection from contaminated water"
            },
            "typhoid": {
                "risk_multiplier": 1.1 if input_data.get('sanitation_score', 6) < 5 else 0.9,
                "seasonal_peak": [4, 5, 6, 10, 11],  # Pre and post monsoon
                "description": "Bacterial infection from contaminated food/water"
            },
            "hepatitis_a": {
                "risk_multiplier": 1.0,
                "seasonal_peak": [3, 4, 5, 10, 11],  # Dry seasons
                "description": "Viral liver infection from contaminated water"
            },
            "diarrhea": {
                "risk_multiplier": 1.3 if input_data.get('water_turbidity', 2) > 4 else 1.0,
                "seasonal_peak": [6, 7, 8, 9, 10],  # Monsoon and post-monsoon
                "description": "Various causes from contaminated water"
            }
        }
        
        current_month = datetime.now().month
        disease_predictions = {}
        
        for disease, info in diseases.items():
            # Calculate disease-specific risk
            base_risk = base_prediction["risk_score"]
            disease_risk = base_risk * info["risk_multiplier"]
            
            # Seasonal adjustment
            if current_month in info["seasonal_peak"]:
                disease_risk *= 1.2
            else:
                disease_risk *= 0.8
            
            disease_risk = min(95, max(5, int(disease_risk)))
            
            disease_predictions[disease] = {
                "risk_score": disease_risk,
                "risk_level": "high" if disease_risk > 70 else "medium" if disease_risk > 40 else "low",
                "description": info["description"],
                "seasonal_peak": current_month in info["seasonal_peak"]
            }
        
        return disease_predictions

def main():
    """Main function to handle command line input"""
    if len(sys.argv) < 2:
        print(json.dumps({"error": "No input data provided"}))
        return
    
    try:
        input_data = json.loads(sys.argv[1])
        predictor = WaterborneAIPredictor()
        
        # Get different types of predictions
        outbreak_risk = predictor.predict_outbreak_risk(input_data)
        seasonal_trends = predictor.predict_seasonal_trends(input_data)
        disease_predictions = predictor.get_disease_specific_predictions(input_data)
        
        # Combine all predictions
        result = {
            "outbreak_risk": outbreak_risk,
            "seasonal_trends": seasonal_trends[:6],  # Next 6 months
            "disease_predictions": disease_predictions,
            "timestamp": datetime.now().isoformat(),
            "model_used": "keras" if predictor.model is not None else "statistical_fallback"
        }
        
        print(json.dumps(result, indent=2))
        
    except json.JSONDecodeError:
        print(json.dumps({"error": "Invalid JSON input"}))
    except Exception as e:
        print(json.dumps({"error": f"Prediction failed: {str(e)}"}))

if __name__ == "__main__":
    main()
