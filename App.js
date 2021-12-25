import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Alert,
    Pressable
} from 'react-native';
import Item from './components/Item.js';
import TaskInput from './components/TaskInput.js';

const imgAddTask = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAAiklEQVQ4y72Tyw2AIBBEX0ysiio4UJS0gUUZ7UILwJMBWX+L0d0bmUdmYBf+rhZHYGRhYSTgaK/klolY9IQ9Fjd0Qrx1RyMBfyqPRLw0E2/a7qOW3g1GZMniO3EfIM5cAvpHQJ+A4REwJGDOvJeVsswvALUldWj1s6o/Tj0aFcNXMd7qBapa0S9qBZsLFPRT8ryrAAAAAElFTkSuQmCC';

const App = () => {
    const [list, setList] = useState([]);
    const [isInput, showInput] = useState(false);
    const [doneCounter, changeDoneCounter] = useState(0);
    const [inProgressCounter, changeInProgressCounter] = useState(0);
    const [filterType, setFilterType] = useState('All');

    useEffect(() => {
        let doneList = list.filter(item => item.done === true);
        let inProgressList = list.filter(item => item.done === false);
        changeDoneCounter(doneList.length);
        changeInProgressCounter(inProgressList.length);
    },[list]);

    const onLongPressDelete = (index) => {
        Alert.alert(
            'Delete task',
            'Do you really want to delete this task?',
            [
                {
                    text: 'Delete',
                    onPress: () => {
                        let arr = [...list];
                        arr.splice(index, 1);
                        setList(arr);
                    }
                },
                {
                    text: 'Cancel'
                }
            ]
        );
    };

    const filterList = () => {
        Alert.alert(
            'Filter List',
            'Choose one',
            [
                {
                    text: 'All',
                    onPress: () => setFilterType('All')
                },
                {
                    text: 'Done',
                    onPress: () => setFilterType('Done')
                },
                {
                    text: 'In Progress',
                    onPress: () => setFilterType('In Progress')
                },
                {
                    text: 'Cancel'
                }
            ]
        );
    };

    const changeTaskDoneState = (index) => {
        let arr = [...list];
        arr[index].done = !arr[index].done;
        setList(arr);
    };

    const addTask = () => {
        showInput(true);
    };

    const hideKeyboard = () => {
        Keyboard.dismiss;
        showInput(false);
    };

    const onSubmitInput = (text) => {
        if (text == 0){
            showInput(false);
            return
        }
        setList(list => [...list, {id: Date.now(), text: text, done: false}]);
        showInput(false);
    };

    return (
        <SafeAreaView style={styles.main}>
            {/* Header */}
            <View style={styles.header}>
                {/* Title */}
                <Text style={styles.headerTitle}>My Tasks</Text>
                {/* Counter */}
                <View style={{alignItems: 'flex-end'}}>
                    <Text style={styles.counter}>Done: {doneCounter}</Text>
                    <Text style={styles.counter}>In progress: {inProgressCounter}</Text>
                </View>
            </View>
            {/* TODO List */}
            <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
                <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
                    <ScrollView
                        style={{ flex: 1 }}
                    >
                        {/* Filter All */}
                        {filterType === 'All' && list.map((item, index) =>
                            <Item key={item.id} text={item.text} done={item.done} index={index} onPress={changeTaskDoneState} onLongPress={onLongPressDelete} />
                        )}
                        {/* Filter Done */}
                        {filterType === 'Done' && list.filter(item => item.done === true).map((item, index) =>
                            <Item key={item.id} text={item.text} done={item.done} index={index} onPress={changeTaskDoneState} onLongPress={onLongPressDelete} />
                        )}
                        {/* Filter In Progress */}
                        {filterType === 'In Progress' && list.filter(item => item.done === false).map((item, index) =>
                            <Item key={item.id} text={item.text} done={item.done} index={index} onPress={changeTaskDoneState} onLongPress={onLongPressDelete} />
                        )}
                        {/* TASK INPUT */}
                        {isInput && <TaskInput onSubmitInput={onSubmitInput} />}
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            {/* Footer */}
            <View style={styles.footer}>
                {/* 'Add new task' button */}
                <Pressable onPress={() => addTask()}>
                    <View
                        style={styles.addTask}
                    >
                        <Image
                            style={styles.addTaskImage}
                            source={{ uri: imgAddTask }}
                        />
                        <Text style={styles.addTaskText}>Add new task</Text>
                    </View>
                </Pressable>
                {/* 'Filter' button */}
                <Pressable style={styles.filter} onPress={() => filterList()}>
                    <Text style={styles.filterText}>Filter: {filterType}</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    header: {
        marginHorizontal: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between'
    },
    headerTitle: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    counter: {
        fontSize: 14,
        fontWeight: '500',
        fontVariant: ['tabular-nums']
    },
    footer:{
        marginTop: 10,
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    addTask: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addTaskText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    addTaskImage: {
        width: 24,
        height: 24,
    },
    filterText: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});

export default App;
