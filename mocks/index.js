import { itemsOverride } from "./handlers";

const isMocking = process.env.NEXT_PUBLIC_MOCK_API === "true";
const isServerSide = typeof window === "undefined";

if (isMocking) {
  if (isServerSide) {
    // mock api in the server if not in a browser
    const { server } = require("./server");
    server.listen({ onUnhandledRequest: "bypass" });
  } else {
    // mock api in the server if not in a browser
    const { worker } = require("./browser");
    worker.start({ onUnhandledRequest: "bypass" });
    const params = new URLSearchParams(window.location.search);
    if (params.get("overrideItems")) {
      worker.use(itemsOverride);
    }
  }
}

export {};
