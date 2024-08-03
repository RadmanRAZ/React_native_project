import React from 'react'
import { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import useFetch from '../../../hook/useFetch'

import { useRouter } from 'expo-router'
import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'

const Popularjobs = () => {


  const {data , isLoading , error } = useFetch(
    'search' , {query : "React developer" , page_num : 1}
  )

  console.log(data.data)
  

 

  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <Text style={styles.headerTitle} > Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn} >Show All</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size='large' color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={''}
                handleCardPress={''}
              />
            )}
            keyExtractor={(item) => item.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  )
}

export default Popularjobs