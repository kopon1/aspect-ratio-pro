class AdAnalytics {
    constructor() {
        this.metrics = {
            impressions: 0,
            clicks: 0,
            revenue: 0
        };
    }

    trackImpression(adId) {
        this.metrics.impressions++;
        this.saveMetrics();
    }

    trackClick(adId) {
        this.metrics.clicks++;
        this.saveMetrics();
    }

    saveMetrics() {
        localStorage.setItem('adMetrics', JSON.stringify(this.metrics));
    }

    getMetrics() {
        return this.metrics;
    }
}

const adAnalytics = new AdAnalytics(); 