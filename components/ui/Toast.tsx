import React from 'react'
import { View, Text } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

export default function CustomToast() {
    const [visible, setVisible] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000); // Hide after 3 seconds

        return () => clearTimeout(timer);
    }, []);

    // if (!visible) {
    //     return null;
    // }
    return (
        <View
            className='bg-white border-b-2 border-b-green-600 rounded-md flex justify-center items-center py-4 absolute right-5 left-5 top-24 z-50 px-6 shadow-lg '>
            <View className='flex flex-row justify-between items-center w-full'>
               
                <View className='flex-1 flex justify-start items-end mr-4'>
                    <Text >fist title message</Text>
                    <Text >Second Title message</Text>
                </View>
                 <AntDesign name="check-circle" size={24} color="black" />
            </View>
        </View>
    )
}
