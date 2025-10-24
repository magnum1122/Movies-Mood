import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View className='flex-1 justify-center items-center'>
        <ActivityIndicator size={'large'} color={"#C11007"}/>
      <Text>Loading</Text>
    </View>
  )
}

export default Loading