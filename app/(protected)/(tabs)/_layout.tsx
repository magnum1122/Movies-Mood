import React from 'react'
import { Tabs } from 'expo-router'
import { ImageBackground, StatusBar, Text, View } from 'react-native'
import { images } from '@/constants/images'
import Ionicons from '@expo/vector-icons/Ionicons';


const TabIcon = ({focused, icon, title}: any) => {
    if(focused){
        return(
        <ImageBackground
                        source={images.highlight}
                        resizeMode={'contain'}
                        className='flex flex-1 flex-row min-w-[90px] min-h-[50px] justify-center
                                   items-center rounded-full'   
                    >
                        <Ionicons name={icon}size={24} color="black" />
                        <Text className='text-base font-semibold ml-[6] mt-1'>{title}</Text>
                    </ImageBackground>
    )
    }

    return(
        <View className='size-full justify-center items-center rounded-full'>
            <Ionicons name={icon}size={24} color="#FF6467" />
        </View>
    )
}

const _layout = () => {
  return (
    <Tabs
        screenOptions={{
            tabBarItemStyle: {
                width:'100%',
                height: '100%',
                // justifyContent: 'center',
                alignItems: 'center'
            },
            tabBarStyle: {
                height: 52,
                paddingTop: 10,
                backgroundColor: '#2B0000',
                position: 'absolute',
                marginBottom: 40,
                borderRadius: 50,
                marginHorizontal: 20,
                overflow: 'hidden',
                borderWidth: 2,
                borderColor: "#A30000",
                paddingHorizontal: 12           
            }
        }}
    >
        <Tabs.Screen 
            name='index'
            options={{
                title: 'Home',
                headerShown: false,
                // tabBarIcon: ({color, size, focused}) => (
                //     <HomeIcon size={30} color={color}/>
                // )
                tabBarIcon: ({focused}) => (
                    <>
                        <TabIcon 
                            focused={focused} icon={"home"} title="Home"
                        />
                    </>
                )
            }}
        />
        <Tabs.Screen 
            name='search'
            options={{
                title: 'Search',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <>
                        <TabIcon 
                            focused={focused} icon={"search"} title="Search"
                        />
                    </>
                )
            }}
        /> 
        <Tabs.Screen 
            name='saved'
            options={{
                title: 'Saved',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <>
                        <TabIcon 
                            focused={focused} icon={"bookmark"} title="Saved"
                        />
                    </>
                )
            }}
        />
        <Tabs.Screen 
            name='profile'
            options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon: ({focused}) => (
                    <>
                        <TabIcon 
                            focused={focused} icon={"person"} title="Profile"
                        />
                    </>
                )
            }}
        />
    </Tabs>
  )
}

export default _layout