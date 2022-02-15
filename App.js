import axios from 'axios';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image } from 'react-native';
const baseURL = 'https://api.github.com'
const perPage = 20
export default function App() {
const [repositories, setRepositories] = useState([])
const [loading, setLoading] = useState(false)
const [page, setPage] = useState(1)

useEffect(()=>{
  loadApi()
},[])

async function loadApi(){
  if(loading) return;

  setLoading(true);

  const response = await axios.get(`${baseURL}/search/repositories?q=react&per_page=${perPage}&page=${page}`)
  setRepositories([...repositories, ...response.data.items])
  setPage(page + 1);
  setLoading(false)
}

  return (
    <View style={styles.container}>
      <FlatList 
      style={{marginTop:35}}
      contentContainerStyle={{marginHorizontal:20}}
      data={repositories}
      keyExtractor={item => String(item.id)}
      renderItem={({item}) => <ListItem data={item}/> }
      onEndReached={loadApi}
      onEndReachedThreshold={0.1}
      ListFooterComponent={<FootherList load={loading}/>}
      />
    </View>
  );
}

function ListItem({data}){
  return(
    <View style={styles.listItem}>
      <Image
        style={styles.tinyLogo}
        source={{
          uri: data.owner.avatar_url,
        }}
      />

      <Text style={styles.listText}>
        {data.full_name}
      </Text>
    </View>
  )
}

function FootherList({load}){
  if(!load) return null;
  return(
    <View style={styles.loading}>
        <ActivityIndicator size={25} color="#107AB0"/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem:{
    backgroundColor:'#107AB0',
    padding: 25,
    marginTop: 20,
    borderRadius:10,
    width: 300,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between'
    
  },
  listText:{
    fontSize:16,
    color: '#FFF',
  },
  loading:{
    padding: 15,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius:50,
  },
});
