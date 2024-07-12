try {
	ConfigureMultiplayer({
		isClientOnly: true
	});
} catch (e) {}

Launch();

(function() {
	let graphicsOutput = new java.io.File(__packdir__ + ".cached_graphics");
	let graphicsBackup = new java.io.File(__packdir__ + ".cached_graphics.bak");
	if (graphicsOutput.exists() && graphicsBackup.exists()) {
		com.zhekasmirnov.innercore.utils.FileTools.copy(graphicsBackup, graphicsOutput);
	}
})();
