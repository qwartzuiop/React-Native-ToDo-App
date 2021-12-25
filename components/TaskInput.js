import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    TextInput,
} from 'react-native';
const imgCircle = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAtUlEQVQ4y72TwQ2DMAxFn5DgBIOUMRgBCYaAA4NkDZgoFyQyBZxy+r01KlCkULX2yY6/8m1/w78tpWVkYWNjYaQlvSqvcWjnjvq8OMEghGXgQU7OgwGLEIbkCDAIT7d7SujwCHMkIzzV6d8VHr0Ty3CI/mNvPcKRhUSDsGc8X8QsogmJCTFcjntATCGcEeUloETMIVwRxSWgQKxfAKIpRTcdPdboxUVL44b4bsg7+oBunegv7Antsm/tOv6JbQAAAABJRU5ErkJggg==';


const TaskInput = ({ onSubmitInput }) => {

    return(
        <View
            style={styles.inputView}
        >
            <View
                style={styles.inputWrapper}
            >
                <Image
                    style={styles.inputImage}
                    source={{ uri: imgCircle }}
                />
                <TextInput
                    style={styles.input}
                    onEndEditing={(e) => onSubmitInput(e.nativeEvent.text)}
                    placeholder='Write your task...'
                    autoFocus={true}
                    returnKeyType='done'
                    maxLength={40}
                />
            </View>
            <View style={styles.divider}></View>
        </View>
    )
};

const styles = StyleSheet.create({
    inputView: {
    },
    inputWrapper: {
        paddingVertical: 16,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputImage: {
        width: 24,
        height: 24,
    },
    input: {
        marginHorizontal: 10,
        fontSize: 18,
        flex: 1,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(0,0,0,.2)',
        marginLeft: 44
    },
});

export default TaskInput;