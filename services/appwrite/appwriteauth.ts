import { appwriteClient } from "./appwrite";
import { Account, ID } from "react-native-appwrite";

type CreateUserAccount = {
  email: string;
  password: string;
  name: string;
};
type LoginUserAccount = {
  email: string;
  password: string;
};

class AppwriteService {
  account;

  constructor() {
    this.account = new Account(appwriteClient);
  }

  //create a new record of user inside appwrite

  async createAccount({ email, password, name }: CreateUserAccount) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });
      if (userAccount) {
        return await this.login({ email, password });
      } else {
        return null;
      }
    } catch (error) {
      console.log("Appwrite service :: createAccount():: " + error);
      return null;
    }
  }

  async login({ email, password }: LoginUserAccount) {
  try {
    await this.account.deleteSession("current").catch(()=>{});
    const session = await this.account.createEmailPasswordSession({ email, password });
    console.log("AppwriteService.login -> session:", session);
    return session;
  } catch (error) {
    console.log("Appwrite service :: loginAccount():: ", error);
    return null;
  }
}

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite service :: getCurrentUser():: " + error);
      return null;
    }
  }

async logout() {
  try {
    await this.account.deleteSessions(); // clears all user sessions
    return true;
  } catch (error) {
    console.log("Appwrite service :: logoutUser():: " + error);
    return null;
  }
}

}

export default AppwriteService;
