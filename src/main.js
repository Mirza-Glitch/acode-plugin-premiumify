import plugin from "../plugin.json";

class AcodePlugin {
  async init() {
    try {
      localStorage.setItem("acode_pro", JSON.stringify(true));
      window.IS_FREE_VERSION = false;
    } catch (e) {
      console.log("error with the plugin which makes everything free: ", e);
    } finally {}
  }

  async destroy() {}
}

if (window.acode) {
  const acodePlugin = new AcodePlugin();
  acode.setPluginInit(
    plugin.id,
    async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
      if (!baseUrl.endsWith("/")) {
        baseUrl += "/";
      }
      acodePlugin.baseUrl = baseUrl;
      await acodePlugin.init($page, cacheFile, cacheFileUrl);
    }
  );
  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}
