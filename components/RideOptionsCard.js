import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image} from 'react-native'
import { Icon } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { selectTravelTimeInformation } from '../slices/navSlice'

const data = [
    {
        id: "Uber-X-123",
        title: "UberX",
        multiplier: 1,
        image: "https://links.papareact.com/3pn"
    },
    {
        id: "Uber-XL-456",
        title: "Uber XL",
        multiplier: 1.2,
        image: "https://links.papareact.com/5w8"
    },
    {
        id: "Uber-LUX-789",
        title: "Uber LUX",
        multiplier: 1.75,
        image: "https://links.papareact.com/7pf"
    },
]

const SURGE_CHARGE_RATE = 1.5;


const RideOptionsCard = () => {
    const navigation = useNavigation();
    const [selected, setSelected] = useState(null)
    const TravelTimeInformation = useSelector(selectTravelTimeInformation)

    return (
        <SafeAreaView style={tw`bg-white flex-grow`}>
            <View>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('NavigateCard')} 
                    style={tw`absolute left-8 p-1 rounded-full`}
                >
                    <Icon name="chevron-left" type="fontawesome" />
                </TouchableOpacity>
                <Text style={tw`text-center text-xl`}>Select a ride - {TravelTimeInformation?.distance?.text}</Text>
            </View>

            <FlatList 
                data={data}
                keyExtractor={(item) => item.id }
                renderItem={({ item: {id, title, multiplier, image}, item }) => (
                    <TouchableOpacity 
                        onPress={() => setSelected(item)}
                        style={tw`flex-row justify-between items-center px-10 ${id === selected?.id && 'bg-gray-200'}`}>
                        <Image
                            style={{
                                width: 80,
                                height: 80,
                                resizeMode: "contain"
                            }}
                            source={{ uri: image }}
                        />
                        <View style={tw`-ml-6`}>
                            <Text style={tw`text-xl text-center font-semibold`}>{title}</Text>
                            <Text>{TravelTimeInformation?.duration?.text}</Text>
                        </View>
                        <Text style={tw`text-xl`}>
                            {new Intl.NumberFormat('pt-br', {
                                style:'currency',
                                currency: 'BRL'
                            }).format(
                                (TravelTimeInformation?.duration.value * SURGE_CHARGE_RATE * multiplier / 100)
                            )
                            }

                        </Text>
                    </TouchableOpacity>
                )}
            />
            <View astyle={tw`mt-auto border-t border-gray-200`}>
                <TouchableOpacity disabled={!selected} style={tw`bg-black py-3 m-3 ${!selected && 'bg-gray-300'}`}>
                    <Text style={tw`text-center text-white text-xl`}>
                        Choose {selected?.title}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default RideOptionsCard

const styles = StyleSheet.create({})
