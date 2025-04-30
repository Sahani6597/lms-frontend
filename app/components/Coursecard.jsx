// app/components/Trending.js
import { View, Text, Image,} from 'react-native';

const Coursecard = ({title, imageSource, rating, price }) => {
    return (
        <View style={{ marginVertical: 8, marginHorizontal: 12 }} className='rounded-xl  bg-gray-100 pb-2 '>
                <View className="w-full aspect-[16/9] ">
                    <Image
                        source={{uri:imageSource}}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </View>
                <Text className="text-lg mt-1 font-['PoppinsSemiBold'] text-wrap mx-1">
                    {title}
                </Text>
                <View className="flex-row justify-between items-center mx-1">
                    <View className="flex-row items-center space-x-1">
                        <Text className="text-yellow-500 text-lg">⭐ </Text>
                        <Text className="text-lg font-['PoppinsSemiBold']">
                            {rating}
                        </Text>
                    </View>
                    <View className="bg-blue-700 px-3 py-1 rounded-full">
                        <Text className="text-white text-md font-['PoppinsSemiBold']">
                            {price===0 ? 'Free' : "$"+price}
                        </Text>
                    </View>
                </View>
        </View>
    );
};

export default Coursecard;