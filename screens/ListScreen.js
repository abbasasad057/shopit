import React, { useState,useEffect } from 'react';
import {Text,Modal,TextInput, View,StyleSheet,StatusBar,Image,ScrollView,Pressable,Switch,Button, TouchableOpacity } from 'react-native';

const RenderList=(props)=>{
    const [items,setItems]=useState([])
    const [modalVisible,setModalVisible]=useState(false)
    const [itemName,setItemName]=useState('')
    const [quantity,setQuantity]=useState('')

    useEffect(()=>{
            setModalVisible(props.isModalVisible[0])
    },[props.isModalVisible])

    const toggleCompleted=(index)=>{
        items[index]={
            name:items[index].name,
            quantity:items[index].quantity,
            price:items[index].price,
            completed:!items[index].completed
        }
        setItems([...items])
    }

    const addItem=(newItem)=>{
        setItems([...items,newItem])
        setModalVisible(!modalVisible)
    }

    const deleteItem=(ind)=>{
        items.splice(ind,1)
        setItems([...items])
    }
    return(
        <ScrollView style={styles.list_container}>
           {items.length?(
               items.map((item,i)=>{
                    return(
                        <View key={i}  >
                            <Pressable style={styles.item_container} android_ripple={{color:'#000'}}>
                            <View style={styles.item_name}>
                                <Text>{item.name}</Text>
                            </View>
                            <View style={styles.item_quantity}>
                                <Text>{item.quantity}</Text>
                            </View>
                            <View style={styles.item_price}>
                                <Text>{item.price}</Text>
                            </View>
                            <View style={styles.item_done}>
                                <Switch
                                value={item.completed}
                                onValueChange={()=>toggleCompleted(i)}
                                />
                            </View>
                            <View >
                            <TouchableOpacity onPress={()=>{deleteItem(i)}} style={styles.item_delete}>
                                <Image style={styles.delete_icon} source={require('../assets/remove-circle-32.png')}/>
                            </TouchableOpacity>
                            </View>
                        </Pressable>
                        </View>
                    )
                })
           ) :(
               <View style={styles.no_item_container}>
                   <Image source={require('../assets/cart-color-256.png')}/>
               </View>
           )
        }
            <Modal
             animationType="slide"
             visible={modalVisible}
            >
                <View style={styles.new_user_form}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setItemName}
                        value={itemName}
                        placeholder="Item Name"
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setQuantity}
                        value={quantity}
                        placeholder="Weight/Units"
                    />
                    <View style={styles.button_view}>
                        <Button 
                        style={styles.button} 
                        title='Add'
                        onPress={()=>{
                            addItem({name:itemName,quantity,price:0,completed:false})
                            
                        }}
                        />
                        <Button 
                        style={styles.button} 
                        title='Cancel' 
                        onPress={() => {
                            setModalVisible(!modalVisible)
                            }}
                        />
                    </View>
                    
                </View>
                
            </Modal>
        </ScrollView>
    )}

function ListScreen(props) {
    let[showAddForm,setFormVisible]=useState([false])
    return (
        <View style={styles.container}>
            <View style={styles.bar_top}>
                <Image style={styles.icon} source={require('../assets/logo-bold.png')}/>
                <TouchableOpacity>
                    <Image style={styles.menu_icon} source={require('../assets/menu-blue-32.png')}/>
                </TouchableOpacity>     
            </View>
            <RenderList isModalVisible={[...showAddForm]}/>
            <View style={styles.bar_bottom}>
                
                <TouchableOpacity onPress={()=>{
                    setFormVisible([true])
                }}>
                    <Image source={require('../assets/add-green-32.png')}/>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item_container: {
        borderWidth:2,
        borderColor:'#E2F1E5',
        flexDirection:'row',
        height:65,
        justifyContent:'space-around',
        fontWeight:'bold',
        marginBottom:7,
        alignItems:'center',
        borderRadius:10,
        marginLeft:7,
        marginRight:7,
    },
    list_container:{
        flexDirection:'column',
        marginTop:10,
        height:600,
        // marginBottom:5
    },
    container:{
        display:'flex',
        justifyContent: 'flex-start',
        marginTop:StatusBar.currentHeight
    },
    item_name:{
        marginLeft:15,
        flex:4,
    },
    item_quantity:{
        flex:3,
    },
    item_price:{
        flex:2,
    },
    item_done:{
        flex:1,

    },
     item_delete:{
        flex:1,
        justifyContent:'center'
    },
    bar_top:{
        // borderWidth:2,
        paddingLeft:5,
        paddingRight:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-start',
        height:75,
        width:'100%',
        elevation: 1,
    },
    bar_bottom:{
        // borderWidth:2,
        position:'absolute',
        top:"100%",
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        height:45,
        width:'100%',
        elevation: 1,
    },
    icon:{
        resizeMode:'contain',
        width:250
    },
    menu_icon:{
        marginLeft:90,
    },
    delete_icon:{
        resizeMode:'contain',
        width:25,
        marginRight:10
    },
    new_user_form:{
        flex:1,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        height:"100%",
    },
    input:{
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width:300,
        borderRadius:5,
    },
    button:{
        flex:1,
        width:50
    },
    button_view:{
        flexDirection:'row'
    },
    modal_icon:{
        resizeMode:'contain',
        width:50
    },
    no_item_container:{
        justifyContent:'center',
        alignItems:'center',
        height:600,
    }

})
export default ListScreen;