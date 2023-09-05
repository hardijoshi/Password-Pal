import { StyleSheet, Text, View,ScrollView,SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'
import * as Yup from 'yup'
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import LinearGradient from 'react-native-linear-gradient';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
  .min(4, 'Minimum Characters should be 4')
  .max(100,'Maximum Characters should be 100')
  .required('Please Enter Password Length')
})

export default function App() {

  const [password, setPassword] = useState('')
  const [isPassGenerated, setIsPassGenerated] = useState(false)

  const [lowerCase, setLowerCase] = useState(true)
  const [upperCase, setUpperCase] = useState(false)
  const [number, setNumber] = useState(false)
  const [symbol, setSymbol] = useState(false)

  const generatePasswordString = (passwordLength: number) => {
      let characterList = '';
      const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowerCaseChars = 'absdefghijklmnopqrstuvwxyz';
      const digitChars = '0123456789';
      const specialChars = '!@#$%^&*()_+';

      if (upperCase) {
        characterList += upperCaseChars
      }
      if (lowerCase) {
        characterList += lowerCaseChars
      }
      if (number) {
        characterList += digitChars
      }
      if (symbol) {
        characterList += specialChars
      }

      const passwordResult = createPassword(characterList,passwordLength)

      setPassword(passwordResult)
      setIsPassGenerated(true)
  }

  const createPassword = (characters: string, passwordLength: number) => {
      let result = ''
      for( let i =0; i < passwordLength; i++){
        const characterIndex = Math.floor(Math.random() * characters.length)
        result += characters.charAt(characterIndex)
      }
      return result
  }

  const resetPassword = () => {
      setPassword('')
      setIsPassGenerated(false)
      setLowerCase(true)
      setUpperCase(false)
      setNumber(false)
      setSymbol(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.header}>Password Generator</Text>
          <Formik
       initialValues={{passwordLength: ''}}
       validationSchema={PasswordSchema}
       onSubmit={values => {
        console.log(values);
        generatePasswordString(Number(values.passwordLength))
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         isSubmitting,
         handleReset
         /* and other goodies */
       }) => (
         <>
         <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength && (
              <Text style={styles.errorText}>
                {errors.passwordLength}
              </Text>
            )}
            
          </View>
          <TextInput style={styles.inputStyle} 
               value={values.passwordLength}
               onChangeText={handleChange('passwordLength')}
               placeholder='Ex: 8'
               keyboardType='numeric'
            />
         </View>
         <View style={styles.inputWrapper}>
              <Text style={styles.heading}>Include Lowercase</Text>
              <BouncyCheckbox
                disableBuiltInState
                isChecked={lowerCase}
                onPress={() => setLowerCase(!lowerCase)}
                fillColor='#29AB87'
              />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include Uppercase</Text>
              <BouncyCheckbox
                disableBuiltInState
                isChecked={upperCase}
                onPress={() => setUpperCase(!upperCase)}
                fillColor='#207398'
              />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include Numbers</Text>
              <BouncyCheckbox
                disableBuiltInState
                isChecked={number}
                onPress={() => setNumber(!number)}
                fillColor='#8D3DAF'
              />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include Symbols</Text>
              <BouncyCheckbox
                disableBuiltInState
                isChecked={symbol}
                onPress={() => setSymbol(!symbol)}
                fillColor='#AF9D5A'
              />
         </View>

         <View style={styles.formActions}>
         
         <LinearGradient colors={['#538FFB','#5737D6']}  style={styles.primaryBtn}>
          <TouchableOpacity
            disabled={!isValid}
           
            onPress={handleSubmit}
          >
            <Text style={styles.primaryBtnText}>Generate Password</Text>
          </TouchableOpacity>
         </LinearGradient>
        
         <LinearGradient colors={['#538FFB','#5737D6']} style={styles.secondaryBtn}>
         <TouchableOpacity
            
            onPress={() => {
              handleReset();
              resetPassword()
            }}
          >
            <Text style={styles.secondaryBtnText}>Reset</Text>
          </TouchableOpacity>
         </LinearGradient>
          
         
         </View>
         </>
       )}
          </Formik>
        </View>  
        {isPassGenerated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result</Text>
            <Text style={styles.description}>(Long press to copy)</Text>
            <Text selectable={true} style={styles.generatedPassword}>{password}</Text>
          </View>
        ): null}
        
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer:{
    flex: 1,
  },
  formContainer:{
    margin: 10,
    padding: 10,
  },
  header:{
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 35,
    color: '#000000',
    textAlign: 'center',
    margin: 15
  },
  inputWrapper:{
    marginBottom: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  formActions:{
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  inputColumn:{
    flexDirection: 'column'
  },
  inputStyle:{
    padding: 10,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e'
  },
  heading:{
    fontSize: 15,
    color: '#000000'
  },
  errorText:{
    fontSize: 12,
    color: 'red',
  },
  primaryBtn:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 60,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 8,
  },
  primaryBtnText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 60,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 18,
    
  },
  secondaryBtnText:{
    fontSize: 15,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight:'700'
  },
  card:{
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 12,
  },
  cardElevated:{
    backgroundColor: '#03203C',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  subTitle:{
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
    color: '#fff'
  },
  description:{
    color: '#fff',
    marginBottom: 8,
    fontSize: 10
  },
  generatedPassword:{
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#fff',
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: '#1B98F5',
    width: 'auto'
  },
})