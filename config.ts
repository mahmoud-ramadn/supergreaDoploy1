interface Config {
  baseUrl: string;
}

const checkConfig = (server: string): Config => {
  switch (server) {
    case "production":
      return { baseUrl: "https://supergrea-doploy1.vercel.app" };
    case "local":
      return { baseUrl: "http://localhost:8000" };
    default:
      throw new Error(`Unknown server: ${server}`);
  }
};

export const selectServer = "production";
export const config = checkConfig(selectServer);
