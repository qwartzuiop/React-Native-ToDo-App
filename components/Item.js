import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Pressable
} from 'react-native';

const imgCircle = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAtUlEQVQ4y72TwQ2DMAxFn5DgBIOUMRgBCYaAA4NkDZgoFyQyBZxy+r01KlCkULX2yY6/8m1/w78tpWVkYWNjYaQlvSqvcWjnjvq8OMEghGXgQU7OgwGLEIbkCDAIT7d7SujwCHMkIzzV6d8VHr0Ty3CI/mNvPcKRhUSDsGc8X8QsogmJCTFcjntATCGcEeUloETMIVwRxSWgQKxfAKIpRTcdPdboxUVL44b4bsg7+oBunegv7Antsm/tOv6JbQAAAABJRU5ErkJggg==';
const imgDone = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAA5ElEQVQ4y73Tv23CUBDH8Y9A7mARGIMJUGRAyQouPABSalgDRnKBcM0CUFkUlyKKDDxDBFJyr7v7nt7v/vHflslt7J2c7G3kskf4VC1uXm3aDfeshFApjQwMjJQqIaz00oS10Cj0r7x9hUZYp2JCY9L590QjroVlaqG4W1sh1Jfl50J1I+bbZg5yfZWQt+6tUHbgc2fhA6WwbQM7YXwH/wRjYdeGjsLwAc5QOKYJbw5mHXiS8CNpIZzNEzyR1Ba9FM4JnhR92dalSPCkrdeDW3j/bXBPr8YLy/fCej99QC+d6F/YF1icjDpia7vPAAAAAElFTkSuQmCC';

const Item = ({ text, done, index, onPress, onLongPress }) => {
    const [isDone, setDone] = useState(done);

    const taskDone = (index) => {
        setDone(!isDone);
        onPress(index);
    };

    return(
        <View>
            <Pressable
                onPress={() => taskDone(index)}
                onLongPress={() => onLongPress(index)}
            >
                <View
                    style={[styles.item, isDone && styles.itemDone]}
                >
                    <Image
                        style={styles.image}
                        source={ isDone ? { uri: imgDone } : { uri: imgCircle }}
                    />
                    <Text
                        style={[styles.text, isDone && styles.textDone]}
                    >
                        {text}
                    </Text>
                </View>
            </Pressable>
            <View style={{height: 1, backgroundColor: 'rgba(0,0,0,.2)', marginLeft: 44}}></View>
        </View>
    )
};

const styles = StyleSheet.create({
    item: {
        paddingVertical: 16,
        marginHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',

    },
    itemDone:{
        opacity: 0.4,
    },
    image: {
        width: 24,
        height: 24,
    },
    text: {
        fontSize: 18,
        marginLeft: 10,
    },
    textDone: {
        textDecorationLine: 'line-through'
    }
});

export default Item;