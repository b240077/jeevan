const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: false // Disable for development
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'file://'],
    credentials: true
}));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Water-borne diseases database
const waterBorneDiseases = {
    cholera: {
        symptoms: ['severe diarrhea', 'vomiting', 'dehydration', 'muscle cramps', 'rapid heart rate'],
        description: 'Cholera is an acute diarrheal infection caused by ingestion of food or water contaminated with the bacterium Vibrio cholerae.',
        treatment: 'Immediate rehydration therapy and antibiotics in severe cases.',
        prevention: 'Safe water, proper sanitation, and good hygiene practices.',
        severity: 'high'
    },
    typhoid: {
        symptoms: ['high fever', 'headache', 'stomach pain', 'weakness', 'loss of appetite', 'rose-colored rash'],
        description: 'Typhoid fever is a bacterial infection caused by Salmonella typhi, spread through contaminated food and water.',
        treatment: 'Antibiotics and supportive care. Hospitalization may be required.',
        prevention: 'Vaccination, safe food and water practices, and proper sanitation.',
        severity: 'high'
    },
    hepatitis_a: {
        symptoms: ['fatigue', 'nausea', 'abdominal pain', 'loss of appetite', 'low-grade fever', 'jaundice'],
        description: 'Hepatitis A is a viral liver infection spread through contaminated food and water.',
        treatment: 'Rest, adequate nutrition, and avoiding alcohol. No specific treatment.',
        prevention: 'Vaccination, safe food and water practices, and good hygiene.',
        severity: 'medium'
    },
    diarrhea: {
        symptoms: ['loose stools', 'abdominal cramps', 'nausea', 'fever', 'dehydration'],
        description: 'Infectious diarrhea caused by various bacteria, viruses, or parasites from contaminated water.',
        treatment: 'Rehydration therapy, probiotics, and antibiotics if bacterial.',
        prevention: 'Safe drinking water, proper food handling, and good hygiene.',
        severity: 'low'
    },
    dysentery: {
        symptoms: ['bloody diarrhea', 'severe abdominal pain', 'fever', 'nausea', 'vomiting'],
        description: 'Dysentery is an inflammatory disorder of the intestine caused by bacteria or parasites.',
        treatment: 'Antibiotics, rehydration therapy, and supportive care.',
        prevention: 'Safe water, proper sanitation, and good hygiene practices.',
        severity: 'medium'
    }
};

// In-memory storage for demo (use a real database in production)
let users = [];
let healthReports = [];
let waterQualityData = [];
let alerts = [];

// Helper functions
function generateId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
}

function analyzeSymptoms(symptoms, duration, waterSource, location = null) {
    let possibleDiseases = [];
    let riskFactors = [];
    let riskScore = 0;

    // Check water source risk
    if (waterSource === 'river_water' || waterSource === 'well_water') {
        riskFactors.push('High-risk water source');
        riskScore += 30;
    }

    // Duration risk assessment
    if (duration === 'more_than_week') {
        riskFactors.push('Prolonged symptoms');
        riskScore += 20;
    } else if (duration === '1_week') {
        riskScore += 10;
    }

    // Disease matching logic
    Object.keys(waterBorneDiseases).forEach(disease => {
        const diseaseData = waterBorneDiseases[disease];
        let matches = 0;

        diseaseData.symptoms.forEach(symptom => {
            const symptomKey = symptom.toLowerCase().replace(/\s+/g, '_');
            if (symptoms.includes(symptomKey) || 
                symptoms.some(s => s.toLowerCase().includes(symptom.toLowerCase().split(' ')[0]))) {
                matches++;
            }
        });

        if (matches > 0) {
            const confidence = Math.round((matches / diseaseData.symptoms.length) * 100);
            possibleDiseases.push({
                name: disease,
                matches: matches,
                data: diseaseData,
                confidence: confidence
            });

            // Add to risk score based on disease severity and confidence
            if (diseaseData.severity === 'high' && confidence > 50) {
                riskScore += 40;
            } else if (diseaseData.severity === 'medium' && confidence > 40) {
                riskScore += 25;
            } else if (confidence > 30) {
                riskScore += 15;
            }
        }
    });

    // Sort by confidence
    possibleDiseases.sort((a, b) => b.confidence - a.confidence);

    // Determine overall risk level
    let riskLevel = 'low';
    if (riskScore > 70) {
        riskLevel = 'high';
    } else if (riskScore > 40) {
        riskLevel = 'medium';
    }

    return {
        diseases: possibleDiseases,
        riskFactors: riskFactors,
        riskScore: Math.min(riskScore, 100),
        riskLevel: riskLevel,
        symptoms: symptoms,
        duration: duration,
        waterSource: waterSource,
        timestamp: new Date().toISOString()
    };
}

// Routes

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        message: 'HealthGuard API is running',
        timestamp: new Date().toISOString()
    });
});

// User registration
app.post('/api/auth/register', (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        // Check if user already exists
        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Create new user
        const user = {
            id: generateId(),
            name,
            email,
            phone,
            password, // In production, hash this password
            createdAt: new Date().toISOString()
        };

        users.push(user);

        // Return user without password
        const { password: _, ...userResponse } = user;
        res.status(201).json({ 
            message: 'User registered successfully', 
            user: userResponse 
        });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

// User login
app.post('/api/auth/login', (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Return user without password
        const { password: _, ...userResponse } = user;
        res.json({ 
            message: 'Login successful', 
            user: userResponse 
        });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Symptom analysis
app.post('/api/symptoms/analyze', (req, res) => {
    try {
        const { symptoms, duration, waterSource, userId, location } = req.body;

        if (!symptoms || symptoms.length === 0) {
            return res.status(400).json({ error: 'Symptoms are required' });
        }

        const analysis = analyzeSymptoms(symptoms, duration, waterSource, location);

        // Save the report
        const report = {
            id: generateId(),
            userId: userId || null,
            analysis,
            location: location || 'Unknown',
            createdAt: new Date().toISOString()
        };

        healthReports.push(report);

        // Generate alert if high risk
        if (analysis.riskLevel === 'high') {
            const alert = {
                id: generateId(),
                type: 'health_risk',
                title: 'High Risk Health Assessment',
                message: `High risk water-borne disease detected in ${location || 'unknown location'}`,
                severity: 'high',
                location: location || 'Unknown',
                timestamp: new Date().toISOString()
            };
            alerts.push(alert);
        }

        res.json({
            message: 'Analysis completed',
            analysis,
            reportId: report.id
        });
    } catch (error) {
        res.status(500).json({ error: 'Analysis failed' });
    }
});

// Get user reports
app.get('/api/reports/user/:userId', (req, res) => {
    try {
        const { userId } = req.params;
        const userReports = healthReports.filter(r => r.userId === userId);
        
        res.json({
            reports: userReports.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch reports' });
    }
});

// Get dashboard statistics
app.get('/api/dashboard/stats', (req, res) => {
    try {
        const totalReports = healthReports.length;
        const activeAlerts = alerts.filter(a => {
            const alertTime = new Date(a.timestamp);
            const now = new Date();
            const hoursDiff = (now - alertTime) / (1000 * 60 * 60);
            return hoursDiff < 24; // Active if within last 24 hours
        }).length;

        const highRiskReports = healthReports.filter(r => r.analysis.riskLevel === 'high').length;
        const riskScore = totalReports > 0 ? 
            Math.round((highRiskReports / totalReports) * 100) : 0;

        // Generate trend data (mock data for demo)
        const trendData = Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (6 - i));
            return {
                date: date.toISOString().split('T')[0],
                cases: Math.floor(Math.random() * 20) + 5,
                symptoms: Math.floor(Math.random() * 30) + 10,
                recoveries: Math.floor(Math.random() * 15) + 3
            };
        });

        res.json({
            totalReports,
            activeAlerts,
            riskScore,
            riskLevel: riskScore > 70 ? 'high' : riskScore > 40 ? 'medium' : 'low',
            trendData,
            waterQuality: {
                ph: 7.2,
                turbidity: 2.1,
                chlorine: 0.8,
                bacteria: 0
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch dashboard stats' });
    }
});

// Get alerts
app.get('/api/alerts', (req, res) => {
    try {
        const recentAlerts = alerts
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 10);

        res.json({ alerts: recentAlerts });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch alerts' });
    }
});

// Water quality data
app.post('/api/water-quality', (req, res) => {
    try {
        const { location, ph, turbidity, chlorine, bacteria, source } = req.body;

        const qualityData = {
            id: generateId(),
            location,
            ph: parseFloat(ph),
            turbidity: parseFloat(turbidity),
            chlorine: parseFloat(chlorine),
            bacteria: parseInt(bacteria),
            source,
            timestamp: new Date().toISOString()
        };

        waterQualityData.push(qualityData);

        // Check for quality issues and generate alerts
        let qualityIssues = [];
        if (ph < 6.5 || ph > 8.5) qualityIssues.push('pH out of safe range');
        if (turbidity > 4) qualityIssues.push('High turbidity');
        if (bacteria > 0) qualityIssues.push('Bacterial contamination detected');

        if (qualityIssues.length > 0) {
            const alert = {
                id: generateId(),
                type: 'water_quality',
                title: 'Water Quality Alert',
                message: `Water quality issues detected: ${qualityIssues.join(', ')}`,
                severity: bacteria > 0 ? 'high' : 'medium',
                location,
                timestamp: new Date().toISOString()
            };
            alerts.push(alert);
        }

        res.json({
            message: 'Water quality data recorded',
            data: qualityData,
            issues: qualityIssues
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to record water quality data' });
    }
});

// Get water quality data
app.get('/api/water-quality', (req, res) => {
    try {
        const recentData = waterQualityData
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .slice(0, 50);

        res.json({ data: recentData });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch water quality data' });
    }
});

// AI Predictions endpoint using Keras model
app.get('/api/predictions', async (req, res) => {
    try {
        const { spawn } = require('child_process');
        
        // Prepare input data for AI model
        const inputData = {
            temperature: 25.0,
            humidity: 80.0,
            rainfall: 150.0,
            water_ph: 7.2,
            water_turbidity: 2.1,
            water_bacteria_count: 0,
            population_density: 300,
            sanitation_score: 6.0,
            previous_cases: healthReports.filter(r => r.analysis.riskLevel === 'high').length,
            // Add recent water quality data if available
            ...getLatestWaterQualityData()
        };

        // Call Python AI predictor
        const pythonProcess = spawn('python', ['ai_predictor.py', JSON.stringify(inputData)]);
        
        let pythonOutput = '';
        let pythonError = '';

        pythonProcess.stdout.on('data', (data) => {
            pythonOutput += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            pythonError += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code === 0 && pythonOutput) {
                try {
                    const aiPredictions = JSON.parse(pythonOutput);
                    
                    // Format response for frontend
                    const response = {
                        outbreakRisk: {
                            level: aiPredictions.outbreak_risk.risk_level,
                            score: aiPredictions.outbreak_risk.risk_score,
                            confidence: aiPredictions.outbreak_risk.confidence,
                            factors: generateRiskFactors(aiPredictions.outbreak_risk)
                        },
                        seasonalForecast: {
                            period: 'Next 6 months',
                            trends: aiPredictions.seasonal_trends,
                            recommendations: generateRecommendations(aiPredictions.outbreak_risk.risk_level)
                        },
                        diseaseSpecific: aiPredictions.disease_predictions,
                        riskTrends: generateRiskTrends(aiPredictions.seasonal_trends),
                        modelInfo: {
                            modelUsed: aiPredictions.model_used,
                            timestamp: aiPredictions.timestamp
                        }
                    };
                    
                    res.json(response);
                } catch (parseError) {
                    console.error('Error parsing AI predictions:', parseError);
                    res.json(getFallbackPredictions());
                }
            } else {
                console.error('Python AI predictor error:', pythonError);
                res.json(getFallbackPredictions());
            }
        });

        // Timeout after 10 seconds
        setTimeout(() => {
            pythonProcess.kill();
            res.json(getFallbackPredictions());
        }, 10000);

    } catch (error) {
        console.error('AI Predictions error:', error);
        res.json(getFallbackPredictions());
    }
});

// Helper function to get latest water quality data
function getLatestWaterQualityData() {
    if (waterQualityData.length === 0) return {};
    
    const latest = waterQualityData[waterQualityData.length - 1];
    return {
        water_ph: latest.ph || 7.0,
        water_turbidity: latest.turbidity || 2.0,
        water_bacteria_count: latest.bacteria || 0
    };
}

// Helper function to generate risk factors
function generateRiskFactors(outbreakRisk) {
    const factors = ['AI model analysis', 'Historical health data'];
    
    if (outbreakRisk.risk_level === 'high') {
        factors.push('High environmental risk detected');
        factors.push('Increased disease transmission probability');
    } else if (outbreakRisk.risk_level === 'medium') {
        factors.push('Moderate environmental conditions');
        factors.push('Seasonal risk factors present');
    } else {
        factors.push('Low environmental risk');
        factors.push('Good water quality indicators');
    }
    
    return factors;
}

// Helper function to generate recommendations
function generateRecommendations(riskLevel) {
    const baseRecommendations = [
        'Continue regular water quality monitoring',
        'Maintain hygiene awareness programs'
    ];
    
    if (riskLevel === 'high') {
        return [
            'Immediate water quality testing required',
            'Increase health surveillance activities',
            'Prepare emergency medical supplies',
            'Issue public health advisories',
            'Coordinate with local health authorities'
        ];
    } else if (riskLevel === 'medium') {
        return [
            'Enhanced water quality monitoring',
            'Promote hygiene awareness campaigns',
            'Prepare preventive measures',
            'Monitor vulnerable populations'
        ];
    } else {
        return baseRecommendations;
    }
}

// Helper function to generate risk trends for visualization
function generateRiskTrends(seasonalTrends) {
    return seasonalTrends.map((trend, index) => ({
        period: trend.month.split(' ')[0].substring(0, 3),
        risk: trend.risk_score,
        level: trend.risk_level
    }));
}

// Fallback predictions when AI model is not available
function getFallbackPredictions() {
    const currentRisk = healthReports.filter(r => r.analysis.riskLevel === 'high').length > 5 ? 'medium' : 'low';
    
    return {
        outbreakRisk: {
            level: currentRisk,
            score: currentRisk === 'high' ? 75 : currentRisk === 'medium' ? 45 : 25,
            confidence: 70,
            factors: ['Statistical analysis', 'Recent health reports', 'Water quality data']
        },
        seasonalForecast: {
            period: 'Next 6 months',
            trends: Array.from({ length: 6 }, (_, i) => ({
                month: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
                risk_score: Math.max(20, 50 - i * 5 + Math.random() * 20),
                risk_level: 'medium'
            })),
            recommendations: [
                'Continue water quality monitoring',
                'Maintain hygiene awareness programs',
                'Monitor health indicators'
            ]
        },
        diseaseSpecific: {
            cholera: { risk_score: 30, risk_level: 'low', description: 'Acute diarrheal infection' },
            typhoid: { risk_score: 35, risk_level: 'low', description: 'Bacterial infection' },
            hepatitis_a: { risk_score: 25, risk_level: 'low', description: 'Viral liver infection' },
            diarrhea: { risk_score: 40, risk_level: 'medium', description: 'Various causes' }
        },
        riskTrends: Array.from({ length: 6 }, (_, i) => ({
            period: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short' }),
            risk: Math.max(20, 50 - i * 5 + Math.random() * 20),
            level: 'medium'
        })),
        modelInfo: {
            modelUsed: 'statistical_fallback',
            timestamp: new Date().toISOString()
        }
    };
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Jeevan Raksha API server running on port ${PORT}`);
    console.log(`Access the application at: http://localhost:${PORT}`);
});

module.exports = app;
