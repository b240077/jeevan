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
        // Navigation
        dashboard: 'Dashboard',
        symptom_form: 'Symptom Form',
        data_collection: 'Data Collection',
        water_quality: 'Water Quality',
        alerts: 'Alerts',
        education: 'Education',
        ai_predictions: 'AI Predictions',
        profile: 'My Profile',
        reports: 'My Reports',
        admin_dashboard: 'Admin Dashboard',
        content_management: 'Content Management',
        login: 'Login',
        
        // Header
        community_health_dashboard: 'Community Health Dashboard',
        real_time_monitoring: 'Real-time health monitoring and outbreak prediction',
        last_7_days: 'Last 7 days',
        last_30_days: 'Last 30 days',
        last_90_days: 'Last 90 days',
        export_data: 'Export Data',
        
        // Dashboard Stats
        total_reports: 'Total Reports',
        active_alerts: 'Active Alerts',
        risk_score: 'Risk Score',
        health_trends: 'Health Trends',
        geographic_distribution: 'Geographic Distribution',
        
        // Symptom Form
        report_symptoms: 'Report Symptoms',
        symptom_form_desc: 'Report your symptoms to help monitor community health',
        select_symptoms: 'Select your symptoms:',
        fever: 'Fever',
        diarrhea: 'Diarrhea',
        vomiting: 'Vomiting',
        nausea: 'Nausea',
        abdominal_pain: 'Abdominal Pain',
        headache: 'Headache',
        fatigue: 'Fatigue',
        dehydration: 'Dehydration',
        muscle_cramps: 'Muscle Cramps',
        jaundice: 'Jaundice',
        symptom_duration: 'Since how many days are you feeling these symptoms?',
        water_source: 'What is your primary source of drinking water?',
        water_treatment: 'Do you treat your water before drinking?',
        severity_level: 'How would you rate the severity of your symptoms?',
        submit_report: 'Submit Report',
        
        // Other sections
        data_collection_desc: 'Report health data from your community',
        mobile_reporting: 'Mobile Reporting',
        mobile_reporting_desc: 'Report health incidents via mobile app or SMS',
        start_reporting: 'Start Reporting',
        asha_workers: 'ASHA Workers',
        asha_workers_desc: 'Data collection from community health workers',
        view_reports: 'View Reports',
        community_volunteers: 'Community Volunteers',
        community_volunteers_desc: 'Volunteer-based health monitoring',
        join_program: 'Join Program',
        
        // Water Quality
        water_quality_desc: 'Monitor water quality in your area',
        ph_level: 'pH Level',
        turbidity: 'Turbidity',
        chlorine: 'Chlorine',
        bacteria: 'Bacteria',
        excellent: 'Excellent',
        good: 'Good',
        moderate: 'Moderate',
        safe: 'Safe',
        water_sources: 'Water Sources',
        
        // Alerts
        alerts_desc: 'Real-time health alerts and warnings',
        
        // Education
        education_desc: 'Learn about water-borne diseases and prevention'
    },
    hi: {
        // Navigation
        dashboard: 'डैशबोर्ड',
        symptom_form: 'लक्षण फॉर्म',
        data_collection: 'डेटा संग्रह',
        water_quality: 'पानी की गुणवत्ता',
        alerts: 'अलर्ट',
        education: 'शिक्षा',
        ai_predictions: 'एआई भविष्यवाणियां',
        profile: 'मेरी प्रोफाइल',
        reports: 'मेरी रिपोर्ट',
        admin_dashboard: 'एडमिन डैशबोर्ड',
        content_management: 'सामग्री प्रबंधन',
        login: 'लॉगिन',
        
        // Header
        community_health_dashboard: 'सामुदायिक स्वास्थ्य डैशबोर्ड',
        real_time_monitoring: 'वास्तविक समय स्वास्थ्य निगरानी और प्रकोप की भविष्यवाणी',
        last_7_days: 'पिछले 7 दिन',
        last_30_days: 'पिछले 30 दिन',
        last_90_days: 'पिछले 90 दिन',
        export_data: 'डेटा निर्यात करें',
        
        // Dashboard Stats
        total_reports: 'कुल रिपोर्ट',
        active_alerts: 'सक्रिय अलर्ट',
        risk_score: 'जोखिम स्कोर',
        health_trends: 'स्वास्थ्य रुझान',
        geographic_distribution: 'भौगोलिक वितरण',
        
        // Symptom Form
        report_symptoms: 'लक्षण रिपोर्ट करें',
        symptom_form_desc: 'सामुदायिक स्वास्थ्य की निगरानी में मदद के लिए अपने लक्षणों की रिपोर्ट करें',
        select_symptoms: 'अपने लक्षण चुनें:',
        fever: 'बुखार',
        diarrhea: 'दस्त',
        vomiting: 'उल्टी',
        nausea: 'मतली',
        abdominal_pain: 'पेट दर्द',
        headache: 'सिरदर्द',
        fatigue: 'थकान',
        dehydration: 'निर्जलीकरण',
        muscle_cramps: 'मांसपेशियों में ऐंठन',
        jaundice: 'पीलिया',
        symptom_duration: 'आप कितने दिनों से इन लक्षणों को महसूस कर रहे हैं?',
        water_source: 'आपके पीने के पानी का मुख्य स्रोत क्या है?',
        water_treatment: 'क्या आप पीने से पहले पानी का उपचार करते हैं?',
        severity_level: 'आप अपने लक्षणों की गंभीरता को कैसे रेट करेंगे?',
        submit_report: 'रिपोर्ट जमा करें',
        
        // Other sections
        data_collection_desc: 'अपने समुदाय से स्वास्थ्य डेटा रिपोर्ट करें',
        mobile_reporting: 'मोबाइल रिपोर्टिंग',
        mobile_reporting_desc: 'मोबाइल ऐप या एसएमएस के माध्यम से स्वास्थ्य घटनाओं की रिपोर्ट करें',
        start_reporting: 'रिपोर्टिंग शुरू करें',
        asha_workers: 'आशा कार्यकर्ता',
        asha_workers_desc: 'सामुदायिक स्वास्थ्य कार्यकर्ताओं से डेटा संग्रह',
        view_reports: 'रिपोर्ट देखें',
        community_volunteers: 'सामुदायिक स्वयंसेवक',
        community_volunteers_desc: 'स्वयंसेवक-आधारित स्वास्थ्य निगरानी',
        join_program: 'कार्यक्रम में शामिल हों',
        
        // Water Quality
        water_quality_desc: 'अपने क्षेत्र में पानी की गुणवत्ता की निगरानी करें',
        ph_level: 'पीएच स्तर',
        turbidity: 'टर्बिडिटी',
        chlorine: 'क्लोरीन',
        bacteria: 'बैक्टीरिया',
        excellent: 'उत्कृष्ट',
        good: 'अच्छा',
        moderate: 'मध्यम',
        safe: 'सुरक्षित',
        water_sources: 'पानी के स्रोत',
        
        // Alerts
        alerts_desc: 'वास्तविक समय स्वास्थ्य अलर्ट और चेतावनी',
        
        // Education
        education_desc: 'पानी से होने वाली बीमारियों और रोकथाम के बारे में जानें'
    },
    as: {
        // Navigation
        dashboard: 'ডেশ্ববর্ড',
        symptom_form: 'লক্ষণ ফৰ্ম',
        data_collection: 'তথ্য সংগ্ৰহ',
        water_quality: 'পানীৰ গুণগত মান',
        alerts: 'সতৰ্কবাণী',
        education: 'শিক্ষা',
        ai_predictions: 'এআই পূৰ্বাভাস',
        profile: 'মোৰ প্ৰফাইল',
        reports: 'মোৰ প্ৰতিবেদন',
        admin_dashboard: 'এডমিন ডেশ্ববর্ড',
        content_management: 'বিষয়বস্তু ব্যৱস্থাপনা',
        login: 'লগইন',
        
        // Header
        community_health_dashboard: 'সম্প্ৰদায়িক স্বাস্থ্য ডেশ্ববর্ড',
        real_time_monitoring: 'প্ৰকৃত সময়ৰ স্বাস্থ্য নিৰীক্ষণ আৰু প্ৰাদুৰ্ভাৱৰ পূৰ্বাভাস',
        last_7_days: 'শেষ ৭ দিন',
        last_30_days: 'শেষ ৩০ দিন',
        last_90_days: 'শেষ ৯০ দিন',
        export_data: 'তথ্য ৰপ্তানি কৰক',
        
        // Dashboard Stats
        total_reports: 'মুঠ প্ৰতিবেদন',
        active_alerts: 'সক্ৰিয় সতৰ্কবাণী',
        risk_score: 'বিপদৰ স্কোৰ',
        health_trends: 'স্বাস্থ্য প্ৰৱণতা',
        geographic_distribution: 'ভৌগোলিক বিতৰণ',
        
        // Symptom Form
        report_symptoms: 'লক্ষণ ৰিপৰ্ট কৰক',
        symptom_form_desc: 'সম্প্ৰদায়িক স্বাস্থ্য নিৰীক্ষণত সহায় কৰিবলৈ আপোনাৰ লক্ষণবোৰ ৰিপৰ্ট কৰক',
        select_symptoms: 'আপোনাৰ লক্ষণবোৰ বাছনি কৰক:',
        fever: 'জ্বৰ',
        diarrhea: 'ডায়েৰিয়া',
        vomiting: 'বমি',
        nausea: 'বমি ভাব',
        abdominal_pain: 'পেটৰ বিষ',
        headache: 'মূৰৰ বিষ',
        fatigue: 'ক্লান্তি',
        dehydration: 'পানীশূন্যতা',
        muscle_cramps: 'পেশীৰ খিচুনি',
        jaundice: 'জণ্ডিচ',
        symptom_duration: 'আপুনি কিমান দিনৰ পৰা এই লক্ষণবোৰ অনুভৱ কৰি আছে?',
        water_source: 'আপোনাৰ খোৱা পানীৰ মুখ্য উৎস কি?',
        water_treatment: 'আপুনি খোৱাৰ আগতে পানী শোধন কৰে নেকি?',
        severity_level: 'আপুনি আপোনাৰ লক্ষণবোৰৰ গুৰুত্বক কেনেকৈ মূল্যায়ন কৰিব?',
        submit_report: 'প্ৰতিবেদন দাখিল কৰক',
        
        // Other sections
        data_collection_desc: 'আপোনাৰ সম্প্ৰদায়ৰ পৰা স্বাস্থ্য তথ্য ৰিপৰ্ট কৰক',
        mobile_reporting: 'মোবাইল ৰিপৰ্টিং',
        mobile_reporting_desc: 'মোবাইল এপ বা এছএমএছৰ জৰিয়তে স্বাস্থ্য ঘটনা ৰিপৰ্ট কৰক',
        start_reporting: 'ৰিপৰ্টিং আৰম্ভ কৰক',
        asha_workers: 'আশা কৰ্মী',
        asha_workers_desc: 'সম্প্ৰদায়িক স্বাস্থ্য কৰ্মীৰ পৰা তথ্য সংগ্ৰহ',
        view_reports: 'প্ৰতিবেদন চাওক',
        community_volunteers: 'সম্প্ৰদায়িক স্বেচ্ছাসেৱক',
        community_volunteers_desc: 'স্বেচ্ছাসেৱক-ভিত্তিক স্বাস্থ্য নিৰীক্ষণ',
        join_program: 'কাৰ্যসূচীত যোগদান কৰক',
        
        // Water Quality
        water_quality_desc: 'আপোনাৰ এলেকাৰ পানীৰ গুণগত মান নিৰীক্ষণ কৰক',
        ph_level: 'পিএইচ স্তৰ',
        turbidity: 'টাৰ্বিডিটি',
        chlorine: 'ক্লৰিন',
        bacteria: 'বেক্টেৰিয়া',
        excellent: 'উৎকৃষ্ট',
        good: 'ভাল',
        moderate: 'মধ্যম',
        safe: 'নিৰাপদ',
        water_sources: 'পানীৰ উৎস',
        
        // Alerts
        alerts_desc: 'প্ৰকৃত সময়ৰ স্বাস্থ্য সতৰ্কবাণী আৰু সাৱধানবাণী',
        
        // Education
        education_desc: 'পানীবাহিত ৰোগ আৰু প্ৰতিৰোধৰ বিষয়ে জানক'
    },
    bn: {
        // Navigation
        dashboard: 'ড্যাশবোর্ড',
        symptom_form: 'উপসর্গ ফর্ম',
        data_collection: 'ডেটা সংগ্রহ',
        water_quality: 'পানির গুণমান',
        alerts: 'সতর্কতা',
        education: 'শিক্ষা',
        ai_predictions: 'এআই পূর্বাভাস',
        profile: 'আমার প্রোফাইল',
        reports: 'আমার রিপোর্ট',
        admin_dashboard: 'অ্যাডমিন ড্যাশবোর্ড',
        content_management: 'কন্টেন্ট ব্যবস্থাপনা',
        login: 'লগইন',
        
        // Header
        community_health_dashboard: 'কমিউনিটি স্বাস্থ্য ড্যাশবোর্ড',
        real_time_monitoring: 'রিয়েল-টাইম স্বাস্থ্য নিরীক্ষণ এবং প্রাদুর্ভাব পূর্বাভাস',
        last_7_days: 'শেষ ৭ দিন',
        last_30_days: 'শেষ ৩০ দিন',
        last_90_days: 'শেষ ৯০ দিন',
        export_data: 'ডেটা এক্সপোর্ট করুন',
        
        // Dashboard Stats
        total_reports: 'মোট রিপোর্ট',
        active_alerts: 'সক্রিয় সতর্কতা',
        risk_score: 'ঝুঁকির স্কোর',
        health_trends: 'স্বাস্থ্য প্রবণতা',
        geographic_distribution: 'ভৌগোলিক বিতরণ',
        
        // Symptom Form
        report_symptoms: 'উপসর্গ রিপোর্ট করুন',
        symptom_form_desc: 'কমিউনিটি স্বাস্থ্য নিরীক্ষণে সহায়তা করতে আপনার উপসর্গ রিপোর্ট করুন',
        select_symptoms: 'আপনার উপসর্গ নির্বাচন করুন:',
        fever: 'জ্বর',
        diarrhea: 'ডায়রিয়া',
        vomiting: 'বমি',
        nausea: 'বমি বমি ভাব',
        abdominal_pain: 'পেট ব্যথা',
        headache: 'মাথাব্যথা',
        fatigue: 'ক্লান্তি',
        dehydration: 'পানিশূন্যতা',
        muscle_cramps: 'পেশী সংকোচন',
        jaundice: 'জন্ডিস',
        symptom_duration: 'আপনি কত দিন ধরে এই উপসর্গগুলি অনুভব করছেন?',
        water_source: 'আপনার পানীয় জলের প্রধান উৎস কী?',
        water_treatment: 'আপনি পান করার আগে পানি পরিশোধন করেন কি?',
        severity_level: 'আপনি আপনার উপসর্গের তীব্রতা কীভাবে রেট করবেন?',
        submit_report: 'রিপোর্ট জমা দিন',
        
        // Other sections
        data_collection_desc: 'আপনার কমিউনিটি থেকে স্বাস্থ্য ডেটা রিপোর্ট করুন',
        mobile_reporting: 'মোবাইল রিপোর্টিং',
        mobile_reporting_desc: 'মোবাইল অ্যাপ বা এসএমএসের মাধ্যমে স্বাস্থ্য ঘটনা রিপোর্ট করুন',
        start_reporting: 'রিপোর্টিং শুরু করুন',
        asha_workers: 'আশা কর্মী',
        asha_workers_desc: 'কমিউনিটি স্বাস্থ্য কর্মীদের থেকে ডেটা সংগ্রহ',
        view_reports: 'রিপোর্ট দেখুন',
        community_volunteers: 'কমিউনিটি স্বেচ্ছাসেবক',
        community_volunteers_desc: 'স্বেচ্ছাসেবক-ভিত্তিক স্বাস্থ্য নিরীক্ষণ',
        join_program: 'প্রোগ্রামে যোগ দিন',
        
        // Water Quality
        water_quality_desc: 'আপনার এলাকায় পানির গুণমান নিরীক্ষণ করুন',
        ph_level: 'পিএইচ স্তর',
        turbidity: 'টার্বিডিটি',
        chlorine: 'ক্লোরিন',
        bacteria: 'ব্যাকটেরিয়া',
        excellent: 'চমৎকার',
        good: 'ভাল',
        moderate: 'মাঝারি',
        safe: 'নিরাপদ',
        water_sources: 'পানির উৎস',
        
        // Alerts
        alerts_desc: 'রিয়েল-টাইম স্বাস্থ্য সতর্কতা এবং সতর্কবাণী',
        
        // Education
        education_desc: 'পানিবাহিত রোগ এবং প্রতিরোধ সম্পর্কে জানুন'
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
        } else if (sectionId === 'predictions') {
            loadAIPredictions();
        }
    }
}

// Global chart variables
let healthChart = null;
let predictionChart = null;

// Dashboard Functions
function loadDashboard() {
    updateHealthTrends();
    updateQuickStats();
    initializeChartControls();
}

function updateHealthTrends() {
    const canvas = document.getElementById('healthChart');
    if (!canvas) return;
    
    // Destroy existing chart if it exists
    if (healthChart) {
        healthChart.destroy();
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        showFallbackChart();
        return;
    }
    
    // Get current date and generate last 7 days
    const today = new Date();
    const labels = [];
    const dates = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
        dates.push(date.toISOString().split('T')[0]);
    }
    
    // Generate realistic day-wise data based on water-borne disease patterns
    const newCases = generateDayWiseData([8, 12, 15, 18, 22, 19, 16], 'cases');
    const symptomsReported = generateDayWiseData([15, 22, 28, 32, 35, 30, 25], 'symptoms');
    const recoveries = generateDayWiseData([5, 8, 12, 15, 18, 16, 14], 'recoveries');
    
    // Create Chart.js chart
    healthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'New Cases',
                    data: newCases,
                    borderColor: '#dc3545',
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#dc3545',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: 'Symptoms Reported',
                    data: symptomsReported,
                    borderColor: '#ffc107',
                    backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#ffc107',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: 'Recoveries',
                    data: recoveries,
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#28a745',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Water-borne Disease Cases - Last 7 Days',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: '#2c3e50'
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        title: function(context) {
                            return `${context[0].label}`;
                        },
                        label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y} ${context.dataset.label === 'New Cases' ? 'cases' : context.dataset.label === 'Symptoms Reported' ? 'reports' : 'recovered'}`;
                        },
                        afterBody: function(context) {
                            const date = dates[context[0].dataIndex];
                            return [`Date: ${date}`];
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Days',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Number of Cases',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        stepSize: 5,
                        font: {
                            size: 11
                        }
                    }
                }
            },
            elements: {
                point: {
                    hoverBorderWidth: 3
                }
            }
        }
    });
}

// Generate realistic day-wise data with some variation
function generateDayWiseData(baseData, type) {
    return baseData.map(value => {
        // Add some realistic variation (±20%)
        const variation = (Math.random() - 0.5) * 0.4 * value;
        const result = Math.round(value + variation);
        return Math.max(0, result); // Ensure no negative values
    });
}

function generateMonthlyRiskData(baseRisk, seasonalFactor, diseaseType) {
    const months = 6;
    const riskData = [];
    
    // Use a seed-based approach for consistent results
    const seed = diseaseType.charCodeAt(0) + baseRisk; // Create consistent seed
    
    for (let i = 0; i < months; i++) {
        let risk = baseRisk;
        
        // Apply seasonal variations based on disease type
        const currentMonth = new Date().getMonth() + i;
        const monthIndex = currentMonth % 12;
        
        // Monsoon season (June-September): months 5-8
        // Post-monsoon (October-December): months 9-11
        // Winter/Spring (January-May): months 0-4
        
        if (diseaseType === 'cholera') {
            if (monthIndex >= 5 && monthIndex <= 8) risk += 20; // Monsoon
            else if (monthIndex >= 9 && monthIndex <= 11) risk += 10; // Post-monsoon
            else risk -= 5; // Winter/Spring
        } else if (diseaseType === 'typhoid') {
            if (monthIndex >= 5 && monthIndex <= 8) risk += 15; // Monsoon
            else if (monthIndex >= 9 && monthIndex <= 11) risk += 8; // Post-monsoon
            else risk -= 3; // Winter/Spring
        } else if (diseaseType === 'hepatitis') {
            if (monthIndex >= 5 && monthIndex <= 8) risk += 12; // Monsoon
            else if (monthIndex >= 9 && monthIndex <= 11) risk += 5; // Post-monsoon
            else risk -= 2; // Winter/Spring
        } else if (diseaseType === 'diarrhea') {
            if (monthIndex >= 5 && monthIndex <= 8) risk += 25; // Monsoon (highest impact)
            else if (monthIndex >= 9 && monthIndex <= 11) risk += 15; // Post-monsoon
            else risk -= 8; // Winter/Spring
        }
        
        // Add consistent variation based on seed instead of random
        const variation = ((seed + i * 7) % 10) - 5; // Deterministic variation ±5
        risk += variation;
        
        // Ensure risk stays within bounds
        risk = Math.max(5, Math.min(95, Math.round(risk)));
        riskData.push(risk);
    }
    
    return riskData;
}

// Chart control functions
function initializeChartControls() {
    const chartButtons = document.querySelectorAll('.chart-btn');
    chartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            chartButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update chart based on selection
            const chartType = this.textContent.toLowerCase();
            updateChartView(chartType);
        });
    });
}

function updateChartView(viewType) {
    if (!healthChart) return;
    
    // Get current date and generate last 7 days
    const today = new Date();
    const labels = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        labels.push(date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }));
    }
    
    let datasets = [];
    
    switch(viewType) {
        case 'symptoms':
            datasets = [
                {
                    label: 'Diarrhea Cases',
                    data: generateDayWiseData([8, 12, 15, 18, 22, 19, 16], 'symptoms'),
                    borderColor: '#dc3545',
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#dc3545',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: 'Fever Cases',
                    data: generateDayWiseData([6, 9, 12, 14, 18, 15, 12], 'symptoms'),
                    borderColor: '#fd7e14',
                    backgroundColor: 'rgba(253, 126, 20, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#fd7e14',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: 'Vomiting Cases',
                    data: generateDayWiseData([4, 6, 8, 10, 12, 9, 7], 'symptoms'),
                    borderColor: '#6f42c1',
                    backgroundColor: 'rgba(111, 66, 193, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#6f42c1',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }
            ];
            break;
            
        case 'cases':
            datasets = [
                {
                    label: 'New Cases',
                    data: generateDayWiseData([8, 12, 15, 18, 22, 19, 16], 'cases'),
                    borderColor: '#dc3545',
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#dc3545',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: 'Active Cases',
                    data: generateDayWiseData([25, 30, 35, 42, 48, 45, 42], 'cases'),
                    borderColor: '#ffc107',
                    backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#ffc107',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }
            ];
            break;
            
        case 'recoveries':
            datasets = [
                {
                    label: 'Daily Recoveries',
                    data: generateDayWiseData([5, 8, 12, 15, 18, 16, 14], 'recoveries'),
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#28a745',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: 'Total Recovered',
                    data: generateDayWiseData([45, 53, 65, 80, 98, 114, 128], 'recoveries'),
                    borderColor: '#20c997',
                    backgroundColor: 'rgba(32, 201, 151, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#20c997',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }
            ];
            break;
    }
    
    // Update chart data
    healthChart.data.labels = labels;
    healthChart.data.datasets = datasets;
    healthChart.options.plugins.title.text = `Water-borne Disease ${viewType.charAt(0).toUpperCase() + viewType.slice(1)} - Last 7 Days`;
    healthChart.update('active');
}

function showFallbackChart() {
    const chartContainer = document.querySelector('.chart-placeholder');
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

// Enhanced symptom mappings with keywords and weights
const symptomMappings = {
    fever: { keywords: ['fever', 'high temperature', 'pyrexia'], weight: 1.0 },
    diarrhea: { keywords: ['diarrhea', 'loose stools', 'watery stools', 'frequent bowel'], weight: 1.2 },
    vomiting: { keywords: ['vomiting', 'nausea', 'throwing up'], weight: 1.1 },
    nausea: { keywords: ['nausea', 'sick feeling', 'queasy'], weight: 0.8 },
    abdominal_pain: { keywords: ['abdominal', 'stomach pain', 'belly pain', 'cramps'], weight: 1.0 },
    headache: { keywords: ['headache', 'head pain', 'migraine'], weight: 0.9 },
    fatigue: { keywords: ['fatigue', 'tiredness', 'weakness', 'exhaustion'], weight: 0.8 },
    dehydration: { keywords: ['dehydration', 'thirst', 'dry mouth', 'weakness'], weight: 1.1 },
    muscle_cramps: { keywords: ['muscle cramps', 'cramps', 'muscle pain'], weight: 1.0 },
    jaundice: { keywords: ['jaundice', 'yellow skin', 'yellow eyes'], weight: 1.3 }
};

// Risk factor mappings
const highRiskSources = ['river_stream', 'pond_lake', 'community_well'];
const mediumRiskSources = ['private_well', 'rainwater', 'water_tanker'];
const severityMultiplier = { mild: 0.8, moderate: 1.0, severe: 1.3, very_severe: 1.5 };

// Symptom Analysis Functions
function analyzeSymptoms(symptoms, duration, waterSource, waterTreatment, severity) {
    let possibleDiseases = [];
    let riskFactors = [];
    let riskScore = 0;
    
    // Analyze each disease with enhanced matching
    Object.keys(waterBorneDiseases).forEach(disease => {
        const diseaseData = waterBorneDiseases[disease];
        let totalScore = 0;
        let matchedSymptoms = 0;
        let criticalMatches = 0;
        
        symptoms.forEach(userSymptom => {
            const symptomData = symptomMappings[userSymptom];
            if (!symptomData) return;
            
            let symptomMatched = false;
            
            diseaseData.symptoms.forEach(diseaseSymptom => {
                symptomData.keywords.forEach(keyword => {
                    if (diseaseSymptom.toLowerCase().includes(keyword.toLowerCase()) || 
                        keyword.toLowerCase().includes(diseaseSymptom.toLowerCase())) {
                        
                        if (!symptomMatched) {
                            totalScore += symptomData.weight;
                            matchedSymptoms++;
                            symptomMatched = true;
                            
                            // Mark critical symptoms
                            if ((disease === 'cholera' && userSymptom === 'diarrhea') ||
                                (disease === 'hepatitis_a' && userSymptom === 'jaundice') ||
                                (disease === 'dysentery' && userSymptom === 'diarrhea') ||
                                (disease === 'typhoid' && userSymptom === 'fever')) {
                                criticalMatches++;
                            }
                        }
                    }
                });
            });
        });
        
        if (matchedSymptoms > 0) {
            // Calculate base confidence
            let confidence = (totalScore / diseaseData.symptoms.length) * 60;
            
            // Bonus for critical symptoms
            confidence += criticalMatches * 15;
            
            // Multiple symptom bonus
            if (matchedSymptoms >= 3) confidence += 10;
            else if (matchedSymptoms >= 2) confidence += 5;
            
            // Apply severity multiplier
            confidence *= (severityMultiplier[severity] || 1.0);
            
            // Water source risk
            if (highRiskSources.includes(waterSource)) {
                confidence += 12;
            } else if (mediumRiskSources.includes(waterSource)) {
                confidence += 8;
            }
            
            // Water treatment risk
            if (waterTreatment === 'none') {
                confidence += 8;
            } else if (waterTreatment === 'boiling' || waterTreatment === 'chlorination') {
                confidence += 3;
            }
            
            // Duration factor
            const durationDays = getDurationInDays(duration);
            if (durationDays >= 7) confidence += 5;
            if (durationDays >= 14) confidence += 5;
            
            // Disease-specific adjustments
            if (disease === 'cholera' && symptoms.includes('diarrhea') && symptoms.includes('vomiting')) {
                confidence += 10;
            }
            if (disease === 'typhoid' && symptoms.includes('fever') && symptoms.includes('headache')) {
                confidence += 8;
            }
            if (disease === 'hepatitis_a' && symptoms.includes('jaundice')) {
                confidence += 15;
            }
            if (disease === 'dysentery' && symptoms.includes('diarrhea') && symptoms.includes('abdominal_pain')) {
                confidence += 8;
            }
            
            confidence = Math.min(Math.round(confidence), 95);
            
            if (confidence >= 15) {
                possibleDiseases.push({
                    name: disease.charAt(0).toUpperCase() + disease.slice(1).replace('_', ' '),
                    matches: matchedSymptoms,
                    criticalMatches: criticalMatches,
                    data: diseaseData,
                    confidence: confidence
                });
            }
        }
    });
    
    // Sort by confidence
    possibleDiseases.sort((a, b) => b.confidence - a.confidence);
    
    // Calculate risk factors
    if (highRiskSources.includes(waterSource)) {
        riskFactors.push('High-risk water source');
    }
    if (waterTreatment === 'none') {
        riskFactors.push('Untreated water consumption');
    }
    if (severity === 'severe' || severity === 'very_severe') {
        riskFactors.push('Severe symptom presentation');
    }
    
    // Calculate overall risk score
    riskScore = possibleDiseases.length > 0 ? possibleDiseases[0].confidence : 10;
    if (riskFactors.length > 0) riskScore += riskFactors.length * 5;
    riskScore = Math.min(riskScore, 100);
    
    // Determine risk level
    let riskLevel = 'low';
    if (riskScore > 50) riskLevel = 'high';
    else if (riskScore > 25) riskLevel = 'medium';
    
    return {
        possibleDiseases,
        riskFactors,
        riskScore,
        riskLevel,
        symptoms,
        duration,
        waterSource,
        waterTreatment,
        severity
    };
}

function getDurationInDays(duration) {
    const durationMap = {
        '1_day': 1, '2_days': 2, '3_days': 3, '4_days': 4, '5_days': 5, '6_days': 6,
        '1_week': 7, '2_weeks': 14, '3_weeks': 21, '1_month': 30, 'more_than_month': 35
    };
    return durationMap[duration] || 1;
}

function submitSymptomForm() {
    const form = document.getElementById('symptomForm');
    if (!form) {
        console.error('Symptom form not found');
        return;
    }
    
    // Get checked symptoms
    const symptomCheckboxes = form.querySelectorAll('input[type="checkbox"]:checked');
    const symptoms = Array.from(symptomCheckboxes).map(cb => cb.value);
    
    console.log('Selected symptoms:', symptoms);
    
    const formData = new FormData(form);
    const duration = formData.get('duration');
    const waterSource = formData.get('water_source');
    const waterTreatment = formData.get('water_treatment');
    const severity = formData.get('severity');
    
    console.log('Form data:', { duration, waterSource, waterTreatment, severity });
    
    if (symptoms.length === 0) {
        showNotification('Please select at least one symptom.', 'error');
        return;
    }
    
    if (!duration || !waterSource || !waterTreatment || !severity) {
        showNotification('Please fill in all required fields.', 'error');
        return;
    }
    
    const submitBtn = document.querySelector('#symptomForm button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
    submitBtn.disabled = true;
    
    try {
        // Analyze symptoms
        console.log('Starting symptom analysis...');
        const analysis = analyzeSymptoms(symptoms, duration, waterSource, waterTreatment, severity);
        console.log('Analysis result:', analysis);
        
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
        
        // Don't reset form immediately to allow user to see results
        setTimeout(() => {
            form.reset();
        }, 2000);
        
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
    if (!resultsContainer) {
        console.error('Analysis results container not found');
        return;
    }
    
    console.log('Displaying analysis for diseases:', analysis.possibleDiseases);
    
    let html = `
        <div class="analysis-card">
            <div class="analysis-header">
                <h3><i class="fas fa-microscope"></i> Disease Analysis Results</h3>
                <p class="report-meta">Report ID: #${report.id} | ${new Date(report.timestamp).toLocaleString()}</p>
            </div>
            
            <div class="symptom-summary">
                <h4><i class="fas fa-list-check"></i> Reported Symptoms:</h4>
                <div class="symptoms-list">
                    ${report.symptoms.map(symptom => `<span class="symptom-tag">${symptom.replace('_', ' ')}</span>`).join('')}
                </div>
                <div class="form-details">
                    <span class="detail-item"><strong>Duration:</strong> ${report.duration.replace('_', ' ')}</span>
                    <span class="detail-item"><strong>Water Source:</strong> ${report.waterSource.replace('_', ' ')}</span>
                    <span class="detail-item"><strong>Treatment:</strong> ${report.waterTreatment}</span>
                    <span class="detail-item"><strong>Severity:</strong> ${report.severity}</span>
                </div>
            </div>
            
            <div class="risk-overview">
                <div class="risk-level-badge ${analysis.riskLevel}">
                    <i class="fas fa-exclamation-triangle"></i>
                    <strong>Risk Level: ${analysis.riskLevel.toUpperCase()}</strong>
                </div>
                <div class="risk-score">
                    <div class="score-circle ${analysis.riskLevel}">
                        <span class="score-number">${analysis.riskScore}</span>
                        <span class="score-label">Risk Score</span>
                    </div>
                </div>
            </div>
    `;
    
    if (analysis.possibleDiseases.length > 0) {
        html += `
            <div class="diseases-section">
                <h4><i class="fas fa-virus"></i> Disease Probability Analysis:</h4>
                <p class="analysis-note">Based on your symptoms, water source, and other factors, here are the possible diseases ranked by probability:</p>
        `;
        
        analysis.possibleDiseases.forEach((disease, index) => {
            const confidenceClass = disease.confidence >= 70 ? 'high-confidence' : 
                                   disease.confidence >= 50 ? 'medium-confidence' : 'low-confidence';
            
            const riskIcon = disease.confidence >= 70 ? 'fas fa-exclamation-circle' :
                           disease.confidence >= 50 ? 'fas fa-exclamation-triangle' : 'fas fa-info-circle';
            
            const probabilityBar = Math.min(disease.confidence, 100);
            
            html += `
                <div class="disease-card ${confidenceClass}" data-confidence="${disease.confidence}">
                    <div class="disease-header">
                        <div class="disease-title">
                            <i class="${riskIcon}"></i>
                            <h5>${disease.name}</h5>
                            <span class="rank-badge">#${index + 1}</span>
                        </div>
                        <div class="confidence-display">
                            <div class="confidence-percentage">${disease.confidence}%</div>
                            <div class="confidence-label">Probability</div>
                        </div>
                    </div>
                    
                    <div class="probability-bar">
                        <div class="probability-fill ${confidenceClass}" style="width: ${probabilityBar}%"></div>
                        <span class="probability-text">${disease.confidence}% Match</span>
                    </div>
                    
                    <div class="match-details">
                        <span class="match-info">
                            <i class="fas fa-check-circle"></i>
                            ${disease.matches} symptoms matched
                        </span>
                        ${disease.criticalMatches > 0 ? `
                            <span class="critical-match">
                                <i class="fas fa-star"></i>
                                ${disease.criticalMatches} critical symptoms
                            </span>
                        ` : ''}
                    </div>
                    
                    <p class="disease-description">${disease.data.description}</p>
                    
                    <div class="disease-details">
                        <div class="detail-section treatment">
                            <h6><i class="fas fa-pills"></i> Treatment:</h6>
                            <p>${disease.data.treatment}</p>
                        </div>
                        <div class="detail-section prevention">
                            <h6><i class="fas fa-shield-alt"></i> Prevention:</h6>
                            <p>${disease.data.prevention}</p>
                        </div>
                    </div>
                </div>
            `;
        });
        
        html += '</div>';
    } else {
        html += `
            <div class="no-diseases">
                <div class="no-diseases-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h4>No Specific Diseases Identified</h4>
                <p>Based on your current symptoms and risk factors, no specific water-borne diseases could be identified with sufficient confidence. This could mean:</p>
                <ul>
                    <li>Your symptoms may be related to other conditions</li>
                    <li>It might be early stages of illness</li>
                    <li>Symptoms may be mild or non-specific</li>
                </ul>
                <p><strong>Recommendation:</strong> Continue monitoring your symptoms and consult a healthcare provider if they persist or worsen.</p>
            </div>
        `;
    }
    
    // Add risk factors if any
    if (analysis.riskFactors && analysis.riskFactors.length > 0) {
        html += `
            <div class="risk-factors-section">
                <h4><i class="fas fa-warning"></i> Risk Factors Identified:</h4>
                <div class="risk-factors-list">
                    ${analysis.riskFactors.map(factor => `
                        <div class="risk-factor-item">
                            <i class="fas fa-exclamation-triangle"></i>
                            <span>${factor}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    html += `
            <div class="recommendations">
                <h4><i class="fas fa-lightbulb"></i> Immediate Recommendations:</h4>
                <div class="recommendations-grid">
                    <div class="recommendation-item urgent">
                        <i class="fas fa-tint"></i>
                        <div>
                            <strong>Hydration</strong>
                            <p>Drink plenty of safe, clean water to prevent dehydration</p>
                        </div>
                    </div>
                    <div class="recommendation-item prevention">
                        <i class="fas fa-hands-wash"></i>
                        <div>
                            <strong>Hygiene</strong>
                            <p>Practice good hand hygiene and sanitation measures</p>
                        </div>
                    </div>
                    <div class="recommendation-item medical">
                        <i class="fas fa-user-md"></i>
                        <div>
                            <strong>Medical Care</strong>
                            <p>Seek medical attention if symptoms worsen or persist beyond 2-3 days</p>
                        </div>
                    </div>
                    <div class="recommendation-item community">
                        <i class="fas fa-users"></i>
                        <div>
                            <strong>Community Alert</strong>
                            <p>Report to local health authorities if multiple cases occur in your area</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="analysis-footer">
                <p class="disclaimer">
                    <i class="fas fa-info-circle"></i>
                    <strong>Disclaimer:</strong> This analysis is for informational purposes only and should not replace professional medical advice. 
                    Always consult with a qualified healthcare provider for proper diagnosis and treatment.
                </p>
            </div>
        </div>
    `;
    
    resultsContainer.innerHTML = html;
    resultsContainer.style.display = 'block';
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
    
    // Add animation to probability bars
    setTimeout(() => {
        const probabilityBars = resultsContainer.querySelectorAll('.probability-fill');
        probabilityBars.forEach(bar => {
            bar.style.transition = 'width 1.5s ease-out';
            bar.style.width = bar.style.width; // Trigger animation
        });
    }, 100);
}

// AI Predictions Functions
function loadAIPredictions() {
    // Show loading state for model status
    updateModelStatus('Loading AI model...', 'loading');
    
    // Get environmental and symptom data for AI prediction
    const inputData = getEnvironmentalData();
    
    // Try to get AI predictions from Keras model
    getAIPredictions(inputData)
        .then(predictions => {
            displayAIPredictions(predictions);
            updateModelStatus('AI Model Active (Keras)', 'active');
        })
        .catch(error => {
            console.log('AI model unavailable, using fallback:', error);
            // Fallback to statistical model
            const fallbackPredictions = generateFallbackPredictions(inputData);
            displayAIPredictions(fallbackPredictions);
            updateModelStatus('Statistical Model (Fallback)', 'fallback');
        })
        .finally(() => {
            // Remove loading indicators if they exist
            const loadingEl = document.querySelector('.loading-recommendations');
            const contentEl = document.querySelector('.predictions-dashboard');
            if (loadingEl) loadingEl.style.display = 'none';
            if (contentEl) contentEl.style.display = 'block';
        });
}

function getEnvironmentalData() {
    // Get data from localStorage or use defaults
    const reports = JSON.parse(localStorage.getItem('symptomReports') || '[]');
    const recentReports = reports.slice(0, 10); // Last 10 reports
    
    // Use consistent static values instead of random ones for Keras model consistency
    return {
        temperature: 32.5, // Fixed temperature for consistent predictions
        humidity: 85,      // Fixed humidity for monsoon season
        rainfall: 75,      // Fixed rainfall amount
        waterQuality: 0.75, // Fixed water quality index
        populationDensity: 1500,
        sanitationIndex: 0.65, // Fixed sanitation index
        symptomReports: recentReports.length,
        seasonalFactor: getSeason(),
        recentSymptoms: recentReports.map(r => r.symptoms).flat()
    };
}

function getSeason() {
    const month = new Date().getMonth() + 1;
    if (month >= 6 && month <= 9) return 'monsoon'; // High risk
    if (month >= 10 && month <= 2) return 'post_monsoon'; // Medium risk
    return 'pre_monsoon'; // Lower risk
}

async function getAIPredictions(inputData) {
    // Try to call the AI predictor API
    const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputData)
    });
    
    if (!response.ok) {
        throw new Error('AI model unavailable');
    }
    
    return await response.json();
}

function generateFallbackPredictions(inputData) {
    // Statistical fallback model - consistent with static Keras model
    const baseRisk = 30;
    let riskScore = baseRisk;
    
    // Environmental factors
    if (inputData.temperature > 32) riskScore += 10;
    if (inputData.humidity > 80) riskScore += 8;
    if (inputData.rainfall > 50) riskScore += 12;
    if (inputData.waterQuality < 0.8) riskScore += 15;
    if (inputData.sanitationIndex < 0.7) riskScore += 10;
    
    // Seasonal adjustment
    if (inputData.seasonalFactor === 'monsoon') riskScore += 15;
    else if (inputData.seasonalFactor === 'post_monsoon') riskScore += 8;
    
    // Recent symptom reports
    if (inputData.symptomReports > 5) riskScore += 10;
    
    riskScore = Math.min(riskScore, 95);
    
    // Generate disease-specific risks - FIXED VALUES for consistency
    const diseases = {
        'Diarrheal Diseases': Math.min(riskScore + 2, 90), // Consistent +2 offset
        'Cholera': Math.min(riskScore * 0.7 + 5, 85),     // Consistent calculation
        'Typhoid': Math.min(riskScore * 0.6 + 3, 80),     // Consistent calculation
        'Hepatitis A': Math.min(riskScore * 0.4 + 2, 70), // Consistent calculation
        'Dysentery': Math.min(riskScore * 0.8 + 1, 85)    // Consistent calculation
    };
    
    return {
        overallRisk: riskScore > 60 ? 'High' : riskScore > 35 ? 'Medium' : 'Low',
        riskScore: Math.round(riskScore),
        seasonalTrend: inputData.seasonalFactor === 'monsoon' ? 'Increasing' : 'Stable',
        diseases: Object.entries(diseases).map(([name, risk]) => ({
            name,
            risk: Math.round(risk),
            trend: risk > 50 ? 'up' : risk > 30 ? 'stable' : 'down'
        })),
        recommendations: generateRecommendations(riskScore, inputData),
        environmentalFactors: inputData,
        modelType: 'statistical'
    };
}

function generateRecommendations(riskScore, inputData) {
    const recommendations = [];
    
    if (riskScore > 60) {
        recommendations.push('Immediate water quality testing in high-risk areas');
        recommendations.push('Deploy mobile health units to affected regions');
        recommendations.push('Issue public health advisory for water treatment');
    }
    
    if (inputData.seasonalFactor === 'monsoon') {
        recommendations.push('Increase surveillance during monsoon season');
        recommendations.push('Ensure proper drainage and sanitation systems');
    }
    
    if (inputData.symptomReports > 5) {
        recommendations.push('Investigate potential outbreak clusters');
        recommendations.push('Enhance community health worker training');
    }
    
    if (inputData.waterQuality < 0.8) {
        recommendations.push('Improve water treatment infrastructure');
        recommendations.push('Distribute water purification tablets');
    }
    
    recommendations.push('Continue routine health monitoring');
    recommendations.push('Maintain emergency medical supplies');
    
    return recommendations;
}

function updateModelStatus(status, type) {
    const statusEl = document.getElementById('modelStatus');
    if (statusEl) {
        statusEl.textContent = status;
        statusEl.className = `model-status ${type}`;
    }
}

function displayAIPredictions(predictions) {
    // Use provided predictions or generate fallback
    if (!predictions) {
        const inputData = getEnvironmentalData();
        predictions = generateFallbackPredictions(inputData);
    }
    
    // Update main risk assessment
    const overallRiskEl = document.getElementById('overallRiskLevel');
    const riskScoreEl = document.getElementById('riskScore');
    const confidenceLevelEl = document.getElementById('confidenceLevel');
    const riskFactorsEl = document.getElementById('riskFactors');
    
    if (overallRiskEl) {
        overallRiskEl.textContent = predictions.overallRisk;
        overallRiskEl.className = `risk-level ${predictions.overallRisk.toLowerCase()}`;
    }
    
    if (riskScoreEl) {
        riskScoreEl.textContent = `${predictions.riskScore}%`;
    }
    
    if (confidenceLevelEl) {
        const confidence = predictions.modelType === 'keras' ? 95 : 85;
        confidenceLevelEl.textContent = `Confidence: ${confidence}%`;
    }
    
    if (riskFactorsEl) {
        const factors = predictions.riskFactors || ['Environmental conditions', 'Seasonal patterns', 'Historical data'];
        riskFactorsEl.innerHTML = `<small>Key factors: ${factors.slice(0, 2).join(', ')}</small>`;
    }
    
    // Update seasonal forecast
    const seasonalTrendEl = document.getElementById('seasonalTrend');
    const peakRiskPeriodEl = document.getElementById('peakRiskPeriod');
    
    if (seasonalTrendEl) {
        const trendIcon = predictions.seasonalTrend === 'Increasing' ? '📈' : predictions.seasonalTrend === 'Decreasing' ? '📉' : '➡️';
        seasonalTrendEl.innerHTML = `${trendIcon} ${predictions.seasonalTrend} trend`;
    }
    
    if (peakRiskPeriodEl) {
        const season = predictions.environmentalFactors?.seasonalFactor;
        const peakPeriod = season === 'monsoon' ? 'Current (Monsoon)' : season === 'post_monsoon' ? 'October-December' : 'June-September';
        peakRiskPeriodEl.textContent = `Peak risk: ${peakPeriod}`;
    }
    
    // Update disease-specific cards
    predictions.diseases.forEach(disease => {
        let cardId = '';
        if (disease.name.toLowerCase().includes('cholera')) cardId = 'choleraCard';
        else if (disease.name.toLowerCase().includes('typhoid')) cardId = 'typhoidCard';
        else if (disease.name.toLowerCase().includes('hepatitis')) cardId = 'hepatitisCard';
        else if (disease.name.toLowerCase().includes('diarrheal')) cardId = 'diarrheaCard';
        
        if (cardId) {
            const card = document.getElementById(cardId);
            if (card) {
                const riskEl = card.querySelector('.disease-risk');
                const scoreEl = card.querySelector('.risk-score span');
                const indicatorEl = card.querySelector('.seasonal-indicator i');
                
                if (riskEl) {
                    const riskLevel = disease.risk > 60 ? 'high' : disease.risk > 35 ? 'medium' : 'low';
                    riskEl.textContent = riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1);
                    riskEl.className = `disease-risk ${riskLevel}`;
                }
                
                if (scoreEl) {
                    scoreEl.textContent = `${disease.risk}%`;
                }
                
                if (indicatorEl) {
                    indicatorEl.className = `fas fa-circle ${disease.trend}`;
                }
            }
        }
    });
    
    // Update model status
    updateModelStatus(
        predictions.modelType === 'keras' ? 'AI Model Active (Keras)' : 'Statistical Model (Fallback)',
        predictions.modelType === 'keras' ? 'active' : 'fallback'
    );
    
    // Update recommendations
    updateRecommendations(predictions.recommendations);
    
    // Draw prediction chart
    drawPredictionChart(predictions);
}

// Add refresh function for the button
function refreshPredictions() {
    loadAIPredictions();
}

function updateRecommendations(recommendations) {
    const recommendationsEl = document.getElementById('recommendationsList');
    if (!recommendationsEl || !recommendations) return;
    
    let html = '';
    recommendations.forEach((rec, index) => {
        const priority = index < 2 ? 'high' : index < 4 ? 'medium' : 'low';
        const icon = priority === 'high' ? 'fa-exclamation-triangle' : priority === 'medium' ? 'fa-info-circle' : 'fa-lightbulb';
        
        html += `
            <div class="recommendation-item ${priority}">
                <div class="recommendation-icon">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="recommendation-text">${rec}</div>
            </div>
        `;
    });
    
    recommendationsEl.innerHTML = html;
}

function drawPredictionChart(predictions) {
    const canvas = document.getElementById('predictionChart');
    if (!canvas) return;
    
    // Destroy existing chart if it exists
    if (predictionChart) {
        predictionChart.destroy();
    }
    
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        showFallbackPredictionChart(predictions);
        return;
    }
    
    // Generate 6-month prediction data
    const today = new Date();
    const months = [];
    const monthLabels = [];
    
    for (let i = 0; i < 6; i++) {
        const date = new Date(today);
        date.setMonth(today.getMonth() + i);
        months.push(date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }));
        monthLabels.push(date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));
    }
    
    const baseRisk = predictions.riskScore;
    const seasonalFactor = predictions.environmentalFactors?.seasonalFactor;
    
    // Generate realistic risk data for different diseases
    const choleraRisk = generateMonthlyRiskData(baseRisk, seasonalFactor, 'cholera');
    const typhoidRisk = generateMonthlyRiskData(baseRisk - 10, seasonalFactor, 'typhoid');
    const hepatitisRisk = generateMonthlyRiskData(baseRisk - 15, seasonalFactor, 'hepatitis');
    const diarrheaRisk = generateMonthlyRiskData(baseRisk + 5, seasonalFactor, 'diarrhea');
    
    // Create Chart.js chart
    predictionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Cholera Risk',
                    data: choleraRisk,
                    borderColor: '#dc3545',
                    backgroundColor: 'rgba(220, 53, 69, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: '#dc3545',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: 'Typhoid Risk',
                    data: typhoidRisk,
                    borderColor: '#fd7e14',
                    backgroundColor: 'rgba(253, 126, 20, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: '#fd7e14',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: 'Hepatitis A Risk',
                    data: hepatitisRisk,
                    borderColor: '#6f42c1',
                    backgroundColor: 'rgba(111, 66, 193, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: '#6f42c1',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                },
                {
                    label: 'Diarrheal Diseases Risk',
                    data: diarrheaRisk,
                    borderColor: '#ffc107',
                    backgroundColor: 'rgba(255, 193, 7, 0.1)',
                    borderWidth: 3,
                    fill: false,
                    tension: 0.4,
                    pointBackgroundColor: '#ffc107',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                title: {
                    display: true,
                    text: 'AI-Predicted Disease Risk - Next 6 Months',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: '#2c3e50'
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: '#ddd',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        title: function(context) {
                            return `${monthLabels[context[0].dataIndex]}`;
                        },
                        label: function(context) {
                            const risk = context.parsed.y;
                            let riskLevel = 'Low';
                            if (risk >= 70) riskLevel = 'High';
                            else if (risk >= 40) riskLevel = 'Medium';
                            
                            return `${context.dataset.label}: ${risk}% (${riskLevel} Risk)`;
                        },
                        afterBody: function(context) {
                            const risk = context[0].parsed.y;
                            let recommendation = '';
                            if (risk >= 70) {
                                recommendation = 'High alert - Implement preventive measures immediately';
                            } else if (risk >= 40) {
                                recommendation = 'Monitor closely - Consider preventive actions';
                            } else {
                                recommendation = 'Continue routine monitoring';
                            }
                            return [`Recommendation: ${recommendation}`];
                        }
                    }
                }
            },
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Months',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)',
                        drawBorder: false
                    },
                    ticks: {
                        font: {
                            size: 11
                        }
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Risk Percentage (%)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: function(context) {
                            // Color grid lines based on risk zones
                            const value = context.tick.value;
                            if (value >= 70) return 'rgba(220, 53, 69, 0.2)';
                            if (value >= 40) return 'rgba(255, 193, 7, 0.2)';
                            return 'rgba(40, 167, 69, 0.2)';
                        },
                        drawBorder: false
                    },
                    ticks: {
                        stepSize: 10,
                        font: {
                            size: 11
                        },
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            elements: {
                point: {
                    hoverBorderWidth: 3
                }
            }
        }
    });
}

function showFallbackPredictionChart(predictions) {
    const chartContainer = document.querySelector('#predictionChart').parentElement;
    if (!chartContainer) return;
    
    const months = ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'];
    const baseRisk = predictions.riskScore;
    
    // Generate risk data
    const riskData = months.map((month, index) => {
        let risk = baseRisk;
        if (month === 'Oct' || month === 'Nov') risk += 15;
        if (month === 'Dec' || month === 'Jan') risk -= 10;
        if (month === 'Feb') risk -= 5;
        risk += (Math.random() - 0.5) * 10;
        return Math.max(10, Math.min(90, Math.round(risk)));
    });
    
    chartContainer.innerHTML = `
        <div class="fallback-prediction-chart">
            <div class="chart-bars">
                ${months.map((month, index) => {
                    const risk = riskData[index];
                    const height = (risk / 90) * 100;
                    const colorClass = risk > 70 ? 'high' : risk > 40 ? 'medium' : 'low';
                    
                    return `
                        <div class="chart-month">
                            <div class="bar-container">
                                <div class="prediction-bar ${colorClass}" style="height: ${height}%;"></div>
                                <span class="risk-value">${risk}%</span>
                            </div>
                            <span class="month-label">${month}</span>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

// Language Functions
function changeLanguage(langCode) {
    if (!langCode || !translations[langCode]) {
        console.error('Invalid language code:', langCode);
        return;
    }
    
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[langCode] && translations[langCode][key]) {
            // Handle different element types
            if (element.tagName === 'INPUT' && element.type === 'submit') {
                element.value = translations[langCode][key];
            } else if (element.tagName === 'OPTION') {
                element.textContent = translations[langCode][key];
            } else {
                element.textContent = translations[langCode][key];
            }
        }
    });
    
    // Update the language selector to reflect current selection
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect && languageSelect.value !== langCode) {
        languageSelect.value = langCode;
    }
    
    // Save language preference
    localStorage.setItem('selectedLanguage', langCode);
    
    // Trigger a custom event for other components that might need to react to language changes
    document.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: langCode } }));
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
