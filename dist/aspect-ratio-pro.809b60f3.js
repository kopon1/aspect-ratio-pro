class AdAnalytics{constructor(){this.metrics={impressions:0,clicks:0,revenue:0}}trackImpression(s){this.metrics.impressions++,this.saveMetrics()}trackClick(s){this.metrics.clicks++,this.saveMetrics()}saveMetrics(){localStorage.setItem("adMetrics",JSON.stringify(this.metrics))}getMetrics(){return this.metrics}}let adAnalytics=new AdAnalytics;
//# sourceMappingURL=aspect-ratio-pro.809b60f3.js.map
