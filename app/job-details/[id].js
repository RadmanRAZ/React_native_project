import { View , Text , RefreshControl , SafeAreaView , ActivityIndicator } from 'react-native'
import { Stack , useRouter , useLocalSearchParams } from 'expo-router'
import { useCallback , useState } from 'react'
import { Company , JobAbout , JobFooter , JobTabs , ScreenHeaderBtn , Specifics } from '../../components'
import { COLORS , icons , SIZES } from '../../constants'
import useFetch from '../../hook/useFetch'
import styles from '../../components/common/header/screenheader.style'
import { ScrollView } from 'react-native-gesture-handler'
import About from '../../components/jobdetails/about/About'


const jobDetale = () => {

  const params = useLocalSearchParams();
  const router = useRouter();

  const {data , isLoading , error , refetch} = useFetch("job-details" , {
    job_id : params.id
  })

  console.log(data)

  const tabs = ["About" , "Qualififcation" , "Responsibilities"]

  const [activeTab , setAvitveTab] = useState(tabs[0])

  const [refreshing , setRefreshing] = useState(false)

  const onRefresh = ()=>{}

  const dispalyAvtivContetn = ()=>{
    switch (activeTab) {
      case "About":
        return <JobAbout
        info = {data[0].job_description ?? 'No DATA provided'}
        />
      
      case "Qualififcation":
        return <Specifics
        title = "Qualififcation"
        points = {data[0].job_highlights?.Qualifications ?? ['N/A']}
        
        />

      case  "Responsibilities":
        return <Specifics
        title = "Responsibilities"
        points = {data[0].job_highlights?.Benefites ?? ['N/A']}
        
        />
        break;
    
      default:
        break;
    }
  }

  return (
    
    <SafeAreaView style = {{flex : 1, backgroundColor : COLORS.lightWhite}}>
        <Stack.Screen options={
          {headerStyle : {backgroundColor : COLORS.lightWhite}
        , headerShadowVisible : false , headerBackVisible : false , headerLeft : ()=>(
          <ScreenHeaderBtn iconUrl={icons.left} dimention='60%' handlePress={()=>router.back()}/>
        ) , headerRight : ()=> (<ScreenHeaderBtn iconUrl={icons.share} dimention="60%" />) , headerTitle : ""
        }
        }/>

        <>
          <ScrollView showsVerticalScrollIndicator = {false} refreshControl={
            <RefreshControl refreshing = {refreshing} onRefresh={onRefresh} />
          } >

            {isLoading ? <ActivityIndicator size="large" color={COLORS.primary} /> : error ? <Text>Somthing went wrong...</Text> : data.length === 0 ?  <Text>No Data</Text> : 
            <View style  = {{padding : SIZES.medium , paddingBottom : 100}}>
                <Company  
                 companyLogo = {data[0].employer_logo}
                 jobTitle = {data[0].job_title}
                 companyName = {data[0].employer_name}
                 location = {data[0].job_country}
                
                />
                <JobTabs
                  tabs = {tabs}
                  activeTab = {activeTab}
                  setAvitveTab = {setAvitveTab}
                />
                {dispalyAvtivContetn()}
                

            </View>  }
            

          </ScrollView>
        </>

    </SafeAreaView>

  )
}

export default jobDetale