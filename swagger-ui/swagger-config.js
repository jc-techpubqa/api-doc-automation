window.onload = function () {
  window.ui = SwaggerUIBundle({
    // Points to the OpenAPI spec served alongside the site
    url: "../openapi/v1/openapi.yaml",
    dom_id: "#swagger-ui",

    deepLinking: true,
    displayRequestDuration: true,
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,

    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],

    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],

    layout: "StandaloneLayout"
  });
};
