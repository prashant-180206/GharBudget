import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Chart from '@/components/chart'
import CircularLoader from '@/components/circularLoader'

const categories = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <SafeAreaView className="h-full w-full bg-primary ">
        <View className="w-full h-[30%] flex items-center justify-center">
          <Text className="text-3xl font-semibold text-Txt">Transactions</Text>
        </View>
        <View
          className="w-full h-[70%] bg-col_bg absolute bottom-0 rounded-t-[80px] 
        "
        >
          <View className="w-2/6 ">
            <CircularLoader progress={45} />
          </View>
          <Text>ertyuio</Text>
          <View className="flex items-center justify-center p-4  w-full">
            <Chart
              data={[
                { column: "Mon", income: 700, expense: 400 },
                { column: "Tue", income: 500, expense: 300 },
                { column: "Wed", income: 600, expense: 500 },
                { column: "Thu", income: 100, expense: 200 },
                { column: "Fri", income: 900, expense: 800 },
                { column: "Sat", income: 200, expense: 100 },
                { column: "Sun", income: 600, expense: 200 },
              ]}
              maxHeight={120}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  )
}

export default categories