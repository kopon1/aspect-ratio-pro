class AdManager {
    constructor() {
        this.adSlots = new Map();
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        
        // Initialize ad slots
        this.defineAdSlots();
        
        // Handle responsive ads
        window.addEventListener('resize', this.handleResize.bind(this));
        
        this.initialized = true;
    }

    defineAdSlots() {
        // Define ad slots with different sizes for responsive design
        const adDefinitions = {
            headerAd: {
                desktop: [728, 90],
                tablet: [468, 60],
                mobile: [320, 50]
            },
            sidebarAd: {
                desktop: [300, 600],
                tablet: [300, 250],
                mobile: null
            },
            contentAd: {
                desktop: [728, 90],
                tablet: [468, 60],
                mobile: [320, 50]
            },
            footerAd: {
                desktop: [728, 90],
                tablet: [468, 60],
                mobile: [320, 50]
            }
        };

        for (const [slotId, sizes] of Object.entries(adDefinitions)) {
            this.adSlots.set(slotId, sizes);
        }
    }

    handleResize() {
        const width = window.innerWidth;
        let sizeType = width > 1024 ? 'desktop' : width > 768 ? 'tablet' : 'mobile';
        
        this.adSlots.forEach((sizes, slotId) => {
            const adElement = document.getElementById(slotId);
            if (adElement && sizes[sizeType]) {
                this.refreshAd(slotId, sizes[sizeType]);
            }
        });
    }

    refreshAd(slotId, size) {
        // Implement ad refresh logic
        console.log(`Refreshing ad ${slotId} with size ${size}`);
    }
}

// Initialize ad manager
const adManager = new AdManager();
if (localStorage.getItem('adConsent') === 'true') {
    adManager.init();
} 