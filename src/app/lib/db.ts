const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;

if (!username || !password) {
  throw new Error("MongoDB credentials are not set in environment variables");
}

const encodedPassword = encodeURIComponent(password);

export const MONGO_DB = `mongodb+srv://${username}:${encodedPassword}@cluster65071.fgiof.mongodb.net/UserData?appName=Cluster65071`;
