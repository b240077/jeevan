# HealthGuard - Smart Community Health Monitoring System

A comprehensive web application for monitoring water-borne diseases in rural Northeast India, built for the Smart India Hackathon.

## 🌟 Features

### Core Functionality
- **AI Symptom Checker**: Interactive chatbot for disease diagnosis
- **Symptom Assessment Form**: Structured form for detailed health evaluation
- **Multi-language Support**: English, Hindi, Assamese, and Bengali
- **User Authentication**: Secure login/signup system
- **Health Dashboard**: Real-time statistics and trends
- **Water Quality Monitoring**: Track water safety parameters
- **Alert System**: Real-time health warnings
- **Educational Resources**: Disease prevention and hygiene information
- **User Profiles**: Personal health history and reports
- **AI Predictions**: Outbreak risk assessment and forecasting

### Technical Features
- Modern, responsive UI with minimal design
- Real-time data visualization with charts
- Secure backend API with rate limiting
- Local data storage with session management
- Cross-platform compatibility

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project files**
   ```bash
   cd jeevan_raksha_health
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the application**
   ```bash
   npm start
   ```

4. **Access the application**
   Open your browser and go to: `http://localhost:3000`

### Alternative: Run without backend
If you want to run just the frontend:
1. Open `index.html` directly in your browser
2. The app will work with local storage (limited functionality)

## 📱 How to Use

### For General Users
1. **Browse without login**: View dashboard, use symptom checker, access education
2. **Create account**: Sign up to save your health assessments
3. **Check symptoms**: Use either the chat interface or structured form
4. **View reports**: Access your personal health history (requires login)
5. **Monitor alerts**: Stay updated on health warnings in your area

### For Health Workers
1. **Data Collection**: Report community health incidents
2. **Water Quality**: Submit water testing results
3. **Alert Management**: Monitor and respond to health alerts
4. **Trend Analysis**: View outbreak predictions and risk assessments

## 🛠️ Development

### Project Structure
```
jeevan_raksha_health/
├── index.html          # Main application page
├── styles.css          # All styling and responsive design
├── script.js           # Frontend JavaScript functionality
├── server.js           # Backend API server
├── package.json        # Node.js dependencies
└── README.md          # This file
```

### Key Technologies
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Database**: In-memory storage (SQLite recommended for production)
- **Security**: Helmet.js, CORS, Rate limiting
- **UI Framework**: Custom CSS with modern design principles

### API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/symptoms/analyze` - Symptom analysis
- `GET /api/reports/user/:userId` - User health reports
- `GET /api/dashboard/stats` - Dashboard statistics
- `GET /api/alerts` - Health alerts
- `POST /api/water-quality` - Submit water quality data
- `GET /api/predictions` - AI predictions

## 🌐 Deployment

### Local Development
```bash
npm run dev  # Uses nodemon for auto-restart
```

### Production Deployment
1. **Prepare for production**:
   - Set up a proper database (SQLite/PostgreSQL)
   - Configure environment variables
   - Set up proper authentication with JWT
   - Enable HTTPS

2. **Deploy to cloud platforms**:
   - **Heroku**: `git push heroku main`
   - **Netlify**: Deploy frontend files
   - **Vercel**: Deploy with `vercel` command
   - **AWS/Azure**: Use respective deployment tools

### Environment Variables
Create a `.env` file for production:
```
PORT=3000
NODE_ENV=production
JWT_SECRET=your-secret-key
DB_URL=your-database-url
```

## 🔧 Customization

### Adding New Languages
1. Update the `translations` object in `script.js`
2. Add new language option in the language selector
3. Update the `changeLanguage()` function

### Adding New Diseases
1. Update the `waterBorneDiseases` object in both `script.js` and `server.js`
2. Add corresponding symptoms and treatment information
3. Update the analysis algorithms

### Styling Changes
- Modify `styles.css` for visual changes
- Update CSS custom properties for color themes
- Adjust responsive breakpoints as needed

## 📊 Data Management

### User Data
- Stored locally in browser localStorage (development)
- Should be migrated to secure database for production
- Includes user profiles, health assessments, and reports

### Health Data
- Symptom assessments and disease predictions
- Water quality measurements
- Alert notifications and responses
- Trend analysis and statistics

## 🔒 Security Considerations

### Current Implementation
- Basic input validation
- CORS protection
- Rate limiting
- Helmet.js security headers

### Production Recommendations
- Implement proper password hashing (bcrypt)
- Use JWT tokens for authentication
- Set up HTTPS/SSL certificates
- Add input sanitization
- Implement proper session management
- Regular security audits

## 🤝 Contributing

### For Hackathon Team
1. Follow the existing code structure
2. Test all changes thoroughly
3. Update documentation for new features
4. Ensure mobile responsiveness

### Code Style
- Use consistent indentation (2 spaces)
- Follow JavaScript ES6+ standards
- Comment complex functions
- Use meaningful variable names

## 📞 Support

### Common Issues
1. **Port already in use**: Change PORT in package.json or kill existing process
2. **Dependencies not installing**: Clear npm cache and retry
3. **Browser compatibility**: Use modern browsers (Chrome, Firefox, Safari, Edge)

### Troubleshooting
- Check browser console for JavaScript errors
- Verify Node.js version compatibility
- Ensure all dependencies are installed
- Check network connectivity for API calls

## 🏆 Hackathon Submission

### Key Highlights
- **Problem Solved**: Water-borne disease monitoring in rural Northeast India
- **Innovation**: AI-powered symptom analysis and outbreak prediction
- **Impact**: Early warning system for vulnerable communities
- **Technology**: Modern web technologies with offline capabilities
- **Scalability**: Designed for easy deployment and scaling

### Demo Script
1. Show the modern, intuitive interface
2. Demonstrate multi-language support
3. Use the AI symptom checker with sample symptoms
4. Show the structured symptom form
5. Display the comprehensive dashboard
6. Highlight the alert system
7. Show user authentication and personal reports
8. Demonstrate water quality monitoring
9. Present AI predictions and trends

### Future Enhancements
- Mobile app development
- Integration with IoT sensors
- Machine learning model improvements
- Government health system integration
- SMS-based reporting for remote areas
- Offline functionality enhancement

---

**Built with ❤️ for Smart India Hackathon**

*Empowering communities through technology for better health outcomes*
