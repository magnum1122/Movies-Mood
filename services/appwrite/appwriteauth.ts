import Snackbar from 'react-native-snackbar'
import { appwriteClient } from './appwrite';
import { Account, ID} from 'react-native-appwrite';


type CreateUserAccount = {
    email: string;
    password: string;
    name: string;
}
type LoginUserAccount = {
    email: string;
    password: string;
}

class AppwriteService {
    account;

    constructor(){
        this.account = new Account(appwriteClient)
    }

    //create a new record of user inside appwrite

    async createAccount({email, password, name}: CreateUserAccount){
        try {
            const userAccount = await this.account.create({
                userId: ID.unique(),
                email,
                password,
                name,
            })
            if (userAccount) {
                // TODO: create login feature
                return this.login({email, password})
            } else {
                return userAccount
            }
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.log("Appwrite service :: createAccount():: "+ error);
        }
    }

    async login({email, password}: LoginUserAccount){
        try {
            return await this.account.createEmailPasswordSession({
            email, 
            password
});
        } catch (error) {
            Snackbar.show({
                text: String(error),
                duration: Snackbar.LENGTH_LONG
            })
            console.log("Appwrite service :: loginAccount():: "+ error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser():: "+ error);
        }
    }

    async logout(){
        try {
            return await this.account.deleteSession('current')
        } catch (error) {
            console.log("Appwrite service :: logoutUser():: "+ error);
        }
    }

}

export default AppwriteService;