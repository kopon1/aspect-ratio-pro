# AspectRatio Pro - Online Aspect Ratio Calculator

A modern, user-friendly web application for calculating and maintaining aspect ratios for images and videos. Perfect for photographers, designers, and content creators.

## Features

- **Real-time Calculations**: Instantly calculate dimensions while maintaining aspect ratios
- **Common Presets**: Quick access to popular aspect ratios (16:9, 4:3, 21:9, etc.)
- **Custom Ratios**: Input your own custom aspect ratios
- **Visual Preview**: See how your dimensions look in real-time
- **Unit Conversion**: Support for pixels, percentages, and em units
- **Dark/Light Mode**: Comfortable viewing in any environment
- **Mobile Responsive**: Works perfectly on all devices

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kopon1/aspect-ratio-pro.git
   cd aspect-ratio-pro
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

## Project Structure

```
aspect-ratio-pro/
├── src/                  # Source files
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript files
│   ├── pages/           # Additional HTML pages
│   └── index.html       # Main HTML file
├── public/              # Static assets
│   └── images/          # Image assets
└── dist/                # Production build output
```

## Features in Detail

### Calculator Section
- Input width or height to automatically calculate the other dimension
- Lock/unlock aspect ratio
- Swap dimensions with one click
- Real-time visual preview
- Support for different unit types

### Common Ratios
- 16:9 (Widescreen HD)
- 4:3 (Traditional)
- 21:9 (Ultrawide)
- 1:1 (Square)
- 3:2 (Photography)
- 9:16 (Mobile Video)

### Tools Section
- Pixel Calculator
- Batch Converter
- Additional utilities for content creators

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, please contact us at aspectratiopro@gmail.com

## Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- All our contributors and users

---
© 2025 AspectRatio Pro. All rights reserved.
