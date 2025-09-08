// Global Variables
let currentUser = null;
let currentSection = 'dashboard';

// Water-borne diseases database
const waterBorneDiseases = {
    cholera: {
        symptoms: ['severe diarrhea', 'vomiting', 'dehydration', 'muscle cramps'],
        description: 'Cholera is an acute diarrheal infection caused by ingestion of food or water contaminated with the bacterium Vibrio cholerae.',
        treatment: 'Oral rehydration therapy (ORT), IV fluids in severe cases, antibiotics if necessary',
        prevention: 'Safe water, proper sanitation, good hygiene practices'
    },
    typhoid: {
        symptoms: ['fever', 'headache', 'abdominal pain', 'diarrhea', 'fatigue'],
        description: 'Typhoid fever is a bacterial infection caused by Salmonella typhi, spread through contaminated food and water.',
        treatment: 'Antibiotics (fluoroquinolones, azithromycin), supportive care, hospitalization in severe cases',
        prevention: 'Vaccination, safe water and food practices, proper sanitation'
    },
    hepatitis_a: {
        symptoms: ['jaundice', 'fatigue', 'abdominal pain', 'nausea', 'fever'],
        description: 'Hepatitis A is a viral liver infection caused by the hepatitis A virus (HAV), transmitted through contaminated water and food.',
        treatment: 'Supportive care, rest, adequate nutrition, avoid alcohol',
        prevention: 'Vaccination, safe water, proper food handling, good hygiene'
    },
    diarrheal_diseases: {
        symptoms: ['diarrhea', 'abdominal cramps', 'nausea', 'dehydration'],
        description: 'Various bacterial, viral, and parasitic infections causing diarrhea, commonly from contaminated water sources.',
        treatment: 'Oral rehydration therapy, probiotics, antibiotics if bacterial',
        prevention: 'Safe drinking water, proper sanitation, hand hygiene'
    },
    dysentery: {
        symptoms: ['bloody diarrhea', 'severe abdominal pain', 'fever', 'dehydration'],
        description: 'Dysentery is an inflammatory disorder of the intestine, especially the colon, causing severe diarrhea with blood.',
        treatment: 'Antibiotics, fluid replacement, hospitalization in severe cases',
        prevention: 'Safe water, proper sanitation, food safety measures'
    }
};

// Language translations
const translations = {
    en: {
        dashboard: 'Dashboard',
        symptom_form: 'Report Symptoms',
        ai_predictions: 'AI Predictions',
        community_data: 'Community Data',
        health_trends: 'Health Trends (Last 7 Days)',
        new_cases: 'New Cases',
        symptoms_reported: 'Symptoms Reported',
        recoveries: 'Recoveries',
        submit_symptoms: 'Submit Symptoms',
        analyze_symptoms: 'Analyze Symptoms'
    },
    hi: {
        dashboard: 'डैशबोर्ड',
        symptom_form: 'लक्षण रिपोर्ट करें',
        ai_predictions: 'एआई भविष्यवाणियां',
        community_data: 'सामुदायिक डेटा',
        health_trends: 'स्वास्थ्य रुझान (पिछले 7 दिन)',
        new_cases: 'नए मामले',
        symptoms_reported: 'लक्षण रिपोर्ट किए गए',
        recoveries: 'रिकवरी',
        submit_symptoms: 'लक्षण जमा करें',
        analyze_symptoms: 'लक्षणों का विश्लेषण करें'
    },
    as: {
        dashboard: 'ডেশ্ববর্ড',
        symptom_form: 'লক্ষণ রিপর্ট কৰক',
        ai_predictions: 'এআই পূর্বাভাস',
        community_data: 'সম্প্রদায়িক তথ্য',
        health_trends: 'স্বাস্থ্য প্রবণতা (শেষ ৭ দিন)',
        new_cases: 'নতুন ক্ষেত্র',
        symptoms_reported: 'লক্ষণ রিপর্ট কৰা হৈছে',
        recoveries: 'আরোগ্য',
        submit_symptoms: 'লক্ষণ জমা দিয়ক',
        analyze_symptoms: 'লক্ষণ বিশ্লেষণ কৰক'
    },
    bn: {
        dashboard: 'ড্যাশবোর্ড',
        symptom_form: 'উপসর্গ রিপোর্ট করুন',
        ai_predictions: 'এআই পূর্বাভাস',
        community_data: 'কমিউনিটি ডেটা',
        health_trends: 'স্বাস্থ্য প্রবণতা (শেষ ৭ দিন)',
        new_cases: 'নতুন কেস',
        symptoms_reported: 'উপসর্গ রিপোর্ট করা হয়েছে',
        recoveries: 'সুস্থতা',
        submit_symptoms: 'উপসর্গ জমা দিন',
        analyze_symptoms: 'উপসর্গ বিশ্লেষণ করুন'
    }
};

// Navigation Functions
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
        
        // Update navigation
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        const activeNavItem = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
        if (activeNavItem) {
            activeNavItem.classList.add('active');
        }
        
        // Load section-specific data
        if (sectionId === 'dashboard') {
            loadDashboard();
        } else if (sectionId === 'ai-predictions') {
            loadAIPredictions();
        }
    }
}

// Dashboard Functions
function loadDashboard() {
    updateHealthTrends();
    updateQuickStats();
}

function updateHealthTrends() {
    const canvas = document.getElementById('healthTrendsChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        // Fallback to HTML chart if canvas fails
        showFallbackChart();
        return;
    }
    
    // Sample data for the last 7 days
    const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'];
    const newCases = [12, 15, 8, 20, 18, 14, 16];
    const symptomsReported = [25, 30, 18, 35, 32, 28, 30];
    const recoveries = [8, 12, 10, 15, 16, 12, 14];
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = 300;
    
    const chartWidth = canvas.width - 80;
    const chartHeight = canvas.height - 80;
    const maxValue = Math.max(...newCases, ...symptomsReported, ...recoveries);
    
    // Draw chart background
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(40, 40, chartWidth, chartHeight);
    
    // Draw grid lines
    ctx.strokeStyle = '#e9ecef';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = 40 + (chartHeight / 5) * i;
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(40 + chartWidth, y);
        ctx.stroke();
    }
    
    // Draw data lines
    function drawLine(data, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        for (let i = 0; i < data.length; i++) {
            const x = 40 + (chartWidth / (data.length - 1)) * i;
            const y = 40 + chartHeight - (data[i] / maxValue) * chartHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
        
        // Draw points
        ctx.fillStyle = color;
        for (let i = 0; i < data.length; i++) {
            const x = 40 + (chartWidth / (data.length - 1)) * i;
            const y = 40 + chartHeight - (data[i] / maxValue) * chartHeight;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
    
    drawLine(newCases, '#dc3545');
    drawLine(symptomsReported, '#ffc107');
    drawLine(recoveries, '#28a745');
    
    // Draw labels
    ctx.fillStyle = '#666';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    for (let i = 0; i < labels.length; i++) {
        const x = 40 + (chartWidth / (labels.length - 1)) * i;
        ctx.fillText(labels[i], x, canvas.height - 10);
    }
}

function showFallbackChart() {
    const chartContainer = document.querySelector('.chart-container');
    if (!chartContainer) return;
    
    chartContainer.innerHTML = `
        <div class="fallback-chart">
            <h4>Health Trends (Last 7 Days)</h4>
            <div class="chart-legend">
                <span class="legend-item"><span class="legend-color" style="background-color: #dc3545;"></span> New Cases</span>
                <span class="legend-item"><span class="legend-color" style="background-color: #ffc107;"></span> Symptoms Reported</span>
                <span class="legend-item"><span class="legend-color" style="background-color: #28a745;"></span> Recoveries</span>
            </div>
            <div class="chart-bars">
                <div class="chart-day">
                    <div class="bar-group">
                        <div class="bar new-cases" style="height: 40%;"></div>
                        <div class="bar symptoms" style="height: 60%;"></div>
                        <div class="bar recoveries" style="height: 30%;"></div>
                    </div>
                    <span>Day 1</span>
                </div>
                <div class="chart-day">
                    <div class="bar-group">
                        <div class="bar new-cases" style="height: 50%;"></div>
                        <div class="bar symptoms" style="height: 70%;"></div>
                        <div class="bar recoveries" style="height: 40%;"></div>
                    </div>
                    <span>Day 2</span>
                </div>
                <div class="chart-day">
                    <div class="bar-group">
                        <div class="bar new-cases" style="height: 30%;"></div>
                        <div class="bar symptoms" style="height: 45%;"></div>
                        <div class="bar recoveries" style="height: 35%;"></div>
                    </div>
                    <span>Day 3</span>
                </div>
                <div class="chart-day">
                    <div class="bar-group">
                        <div class="bar new-cases" style="height: 65%;"></div>
                        <div class="bar symptoms" style="height: 85%;"></div>
                        <div class="bar recoveries" style="height: 50%;"></div>
                    </div>
                    <span>Day 4</span>
                </div>
                <div class="chart-day">
                    <div class="bar-group">
                        <div class="bar new-cases" style="height: 60%;"></div>
                        <div class="bar symptoms" style="height: 80%;"></div>
                        <div class="bar recoveries" style="height: 55%;"></div>
                    </div>
                    <span>Day 5</span>
                </div>
                <div class="chart-day">
                    <div class="bar-group">
                        <div class="bar new-cases" style="height: 45%;"></div>
                        <div class="bar symptoms" style="height: 65%;"></div>
                        <div class="bar recoveries" style="height: 40%;"></div>
                    </div>
                    <span>Day 6</span>
                </div>
                <div class="chart-day">
                    <div class="bar-group">
                        <div class="bar new-cases" style="height: 55%;"></div>
                        <div class="bar symptoms" style="height: 75%;"></div>
                        <div class="bar recoveries" style="height: 45%;"></div>
                    </div>
                    <span>Day 7</span>
                </div>
            </div>
        </div>
    `;
}

function updateQuickStats() {
    // Update quick stats with sample data
    const stats = {
        totalCases: 156,
        activeCases: 42,
        recoveries: 114,
        riskLevel: 'Medium'
    };
    
    const totalCasesEl = document.getElementById('totalCases');
    const activeCasesEl = document.getElementById('activeCases');
    const recoveriesEl = document.getElementById('recoveries');
    const riskLevelEl = document.getElementById('riskLevel');
    
    if (totalCasesEl) totalCasesEl.textContent = stats.totalCases;
    if (activeCasesEl) activeCasesEl.textContent = stats.activeCases;
    if (recoveriesEl) recoveriesEl.textContent = stats.recoveries;
    if (riskLevelEl) {
        riskLevelEl.textContent = stats.riskLevel;
        riskLevelEl.className = `risk-level ${stats.riskLevel.toLowerCase()}`;
    }
}

// Symptom Analysis Functions
function analyzeSymptoms(symptoms, duration, waterSource, waterTreatment, severity) {
    let possibleDiseases = [];
    let riskScore = 0;
    
    // Analyze each disease
    Object.keys(waterBorneDiseases).forEach(disease => {
        const diseaseData = waterBorneDiseases[disease];
        let matches = 0;
        let confidence = 0;
        
        // Check symptom matches
        symptoms.forEach(symptom => {
            diseaseData.symptoms.forEach(diseaseSymptom => {
                if (diseaseSymptom.toLowerCase().includes(symptom.toLowerCase()) || 
                    symptom.toLowerCase().includes(diseaseSymptom.toLowerCase())) {
                    matches++;
                }
            });
        });
        
        if (matches > 0) {
            confidence = (matches / diseaseData.symptoms.length) * 100;
            
            // Adjust confidence based on risk factors
            if (waterSource === 'well' || waterSource === 'river') confidence += 10;
            if (waterTreatment === 'none') confidence += 15;
            if (severity === 'severe') confidence *= 1.2;
            if (duration === 'more_than_week') confidence += 10;
            
            confidence = Math.min(Math.round(confidence), 95);
            
            if (confidence >= 20) {
                possibleDiseases.push({
                    name: disease.charAt(0).toUpperCase() + disease.slice(1).replace('_', ' '),
                    matches: matches,
                    data: diseaseData,
                    confidence: confidence
                });
            }
        }
    });
    
    // Sort by confidence
    possibleDiseases.sort((a, b) => b.confidence - a.confidence);
    
    // Calculate overall risk score
    riskScore = Math.min(possibleDiseases.length > 0 ? possibleDiseases[0].confidence : 20, 100);
    
    // Determine risk level
    let riskLevel = 'low';
    if (riskScore > 60) riskLevel = 'high';
    else if (riskScore > 35) riskLevel = 'medium';
    
    return {
        possibleDiseases,
        riskScore,
        riskLevel,
        symptoms,
        duration,
        waterSource,
        waterTreatment,
        severity
    };
}

function submitSymptomForm() {
    const form = document.getElementById('symptomForm');
    if (!form) return;
    
    const formData = new FormData(form);
    const symptoms = formData.getAll('symptoms');
    const duration = formData.get('duration');
    const waterSource = formData.get('waterSource');
    const waterTreatment = formData.get('waterTreatment');
    const severity = formData.get('severity');
    
    if (symptoms.length === 0) {
        showNotification('Please select at least one symptom.', 'error');
        return;
    }
    
    const submitBtn = document.querySelector('#symptomForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    submitBtn.disabled = true;
    
    try {
        // Analyze symptoms
        const analysis = analyzeSymptoms(symptoms, duration, waterSource, waterTreatment, severity);
        
        // Display results
        displaySymptomAnalysis({
            id: Date.now(),
            symptoms,
            duration,
            waterSource,
            waterTreatment,
            severity,
            timestamp: new Date().toISOString()
        }, analysis);
        
        // Store in localStorage
        const reports = JSON.parse(localStorage.getItem('symptomReports') || '[]');
        reports.unshift({
            id: Date.now(),
            symptoms,
            duration,
            waterSource,
            waterTreatment,
            severity,
            analysis,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('symptomReports', JSON.stringify(reports));
        
        showNotification('Symptom analysis completed successfully!', 'success');
        form.reset();
        
    } catch (error) {
        console.error('Error analyzing symptoms:', error);
        showNotification('Failed to analyze symptoms. Please try again.', 'error');
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function displaySymptomAnalysis(report, analysis) {
    const resultsContainer = document.getElementById('analysisResults');
    if (!resultsContainer) return;
    
    let html = `
        <div class="analysis-card">
            <div class="analysis-header">
                <h3><i class="fas fa-microscope"></i> Disease Analysis Results</h3>
                <p>Report ID: #${report.id} | ${new Date(report.timestamp).toLocaleString()}</p>
            </div>
            
            <div class="risk-overview">
                <div class="risk-level-badge ${analysis.riskLevel}">
                    <i class="fas fa-exclamation-triangle"></i>
                    <strong>Risk Level: ${analysis.riskLevel.toUpperCase()}</strong>
                </div>
                <div class="risk-score">Risk Score: ${analysis.riskScore}/100</div>
            </div>
    `;
    
    if (analysis.possibleDiseases.length > 0) {
        html += '<div class="diseases-section"><h4><i class="fas fa-virus"></i> Possible Water-Borne Diseases:</h4>';
        
        analysis.possibleDiseases.forEach((disease, index) => {
            const confidenceClass = disease.confidence >= 60 ? 'high-confidence' : 
                                   disease.confidence >= 35 ? 'medium-confidence' : 'low-confidence';
            
            html += `
                <div class="disease-card ${confidenceClass}">
                    <div class="disease-header">
                        <h5>${disease.name}</h5>
                        <span class="confidence-badge">${disease.confidence}% match</span>
                    </div>
                    <p class="disease-description">${disease.data.description}</p>
                    <div class="disease-details">
                        <div class="detail-section">
                            <strong>Treatment:</strong>
                            <p>${disease.data.treatment}</p>
                        </div>
                        <div class="detail-section">
                            <strong>Prevention:</strong>
                            <p>${disease.data.prevention}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
    } else {
        html += '<div class="no-diseases"><p>No specific water-borne diseases identified based on current symptoms. Continue monitoring and consult healthcare provider if symptoms persist.</p></div>';
    }
    
    html += `
            <div class="recommendations">
                <h4><i class="fas fa-lightbulb"></i> Recommendations:</h4>
                <ul>
                    <li>Ensure adequate hydration with safe, clean water</li>
                    <li>Practice good hygiene and sanitation</li>
                    <li>Seek medical attention if symptoms worsen or persist</li>
                    <li>Report to local health authorities if multiple cases occur</li>
                </ul>
            </div>
        </div>
    `;
    
    resultsContainer.innerHTML = html;
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

// AI Predictions Functions
function loadAIPredictions() {
    const loadingEl = document.getElementById('aiLoadingState');
    const contentEl = document.getElementById('aiPredictionContent');
    
    if (loadingEl) loadingEl.style.display = 'block';
    if (contentEl) contentEl.style.display = 'none';
    
    // Simulate AI prediction loading
    setTimeout(() => {
        displayAIPredictions();
        if (loadingEl) loadingEl.style.display = 'none';
        if (contentEl) contentEl.style.display = 'block';
    }, 2000);
}

function displayAIPredictions() {
    const container = document.getElementById('aiPredictionContent');
    if (!container) return;
    
    // Sample AI prediction data
    const predictions = {
        overallRisk: 'Medium',
        riskScore: 65,
        seasonalTrend: 'Increasing',
        diseases: [
            { name: 'Diarrheal Diseases', risk: 70, trend: 'up' },
            { name: 'Cholera', risk: 45, trend: 'stable' },
            { name: 'Typhoid', risk: 35, trend: 'down' },
            { name: 'Hepatitis A', risk: 25, trend: 'stable' }
        ],
        recommendations: [
            'Increase water quality monitoring in high-risk areas',
            'Enhance community awareness programs',
            'Prepare additional medical supplies',
            'Monitor weather patterns for flood risks'
        ]
    };
    
    let html = `
        <div class="ai-predictions-grid">
            <div class="prediction-card overall-risk">
                <h3><i class="fas fa-chart-line"></i> Overall Outbreak Risk</h3>
                <div class="risk-meter">
                    <div class="risk-level ${predictions.overallRisk.toLowerCase()}">${predictions.overallRisk}</div>
                    <div class="risk-percentage">${predictions.riskScore}%</div>
                </div>
            </div>
            
            <div class="prediction-card seasonal-trend">
                <h3><i class="fas fa-calendar-alt"></i> Seasonal Trend</h3>
                <div class="trend-indicator ${predictions.seasonalTrend.toLowerCase()}">
                    <i class="fas fa-arrow-up"></i>
                    ${predictions.seasonalTrend}
                </div>
            </div>
        </div>
        
        <div class="disease-predictions">
            <h3><i class="fas fa-virus"></i> Disease-Specific Risk Assessment</h3>
            <div class="disease-grid">
    `;
    
    predictions.diseases.forEach(disease => {
        const trendIcon = disease.trend === 'up' ? 'fa-arrow-up' : 
                         disease.trend === 'down' ? 'fa-arrow-down' : 'fa-minus';
        const riskClass = disease.risk >= 60 ? 'high' : disease.risk >= 35 ? 'medium' : 'low';
        
        html += `
            <div class="disease-risk-card ${riskClass}">
                <h4>${disease.name}</h4>
                <div class="risk-info">
                    <span class="risk-percentage">${disease.risk}%</span>
                    <i class="fas ${trendIcon} trend-${disease.trend}"></i>
                </div>
            </div>
        `;
    });
    
    html += `
            </div>
        </div>
        
        <div class="ai-recommendations">
            <h3><i class="fas fa-lightbulb"></i> AI Recommendations</h3>
            <ul>
    `;
    
    predictions.recommendations.forEach(rec => {
        html += `<li>${rec}</li>`;
    });
    
    html += `
            </ul>
        </div>
    `;
    
    container.innerHTML = html;
}

// Language Functions
function changeLanguage(langCode) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[langCode] && translations[langCode][key]) {
            element.textContent = translations[langCode][key];
        }
    });
    
    // Save language preference
    localStorage.setItem('selectedLanguage', langCode);
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load saved language
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.value = savedLanguage;
        changeLanguage(savedLanguage);
    }
    
    // Initialize dashboard
    showSection('dashboard');
    
    // Set up form submission
    const symptomForm = document.getElementById('symptomForm');
    if (symptomForm) {
        symptomForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitSymptomForm();
        });
    }
});
