import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";

export class Session {
    private navigation = useNavigation()

    public async getSession(): Promise<any>{
        return await AsyncStorage.getItem('session')
    }

    public async isLoggedIn(): Promise<boolean>{
        const sessionInfo = await this.getSession()
        return sessionInfo ? true : false
    }

    public async signOut(): Promise<void>{
        await AsyncStorage.removeItem('session')
        this.navigation.reset({
            index: 0,
            routes:[{ name: '(account)/account' as never }]
        })
    }
}