const CreateTask = ({navigation}) => {
    return(
        <>
         <View style={styles.add}>
            <TouchableOpacity style={styles.button} onPress={addTask}>
              <Text></Text>
            </TouchableOpacity>
          </View>
        </>
    )
}

export default CreateTask