import React from 'react'
import { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'

import { useRouter } from 'expo-router'
import styles from './popularjobs.style'
import { COLORS, SIZES } from '../../../constants'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'

const Popularjobs = () => {

  const router = useRouter();
  const isLoading = false;
  const error = false;

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
        ) : error ? (<Text>somthing went wrong</Text>) : (<FlatList
          renderItem={({ item }) => (<PopularJobCard item={item} keyExtractor={item => item?.job_id}  />)}contentContainerStyle = {{columnGap : SIZES.medium}} horizontal data={[1, 2, 3, 4, 5]}
        />)}
      </View>
    </View>
  )
}

export default Popularjobs