import React, { useState } from 'react';
import { Button, Provider, Form, TextField, View, Flex, defaultTheme } from '@adobe/react-spectrum';
import { fetchRomanNumeral } from '../../utils/api-client.js';

const App = () => {
  const [integer, setInteger] = useState('');
  const [romanNumeral, setRomanNumeral] = useState('');
  const [error, setError] = useState('');

  const handleConversion = async () => {
    try {
      const data = await fetchRomanNumeral(integer);
      if (data?.error) {
        setError(data?.error);
        setRomanNumeral('');
      } else {
        setRomanNumeral(data?.output);
        setError('');
      }
    } catch (error) {
      setError(error?.message || 'Error fetching Roman numeral.');
    }
  };

  return (
    <Provider theme={defaultTheme}>
      <Flex direction="row" justifyContent="center" alignItems="center" height="100vh">
        <View
          UNSAFE_style={{ fontFamily: 'Times New Roman' }}
          width="100%"
          maxWidth="500px"
          padding={{ base: 'size-200', M: 'size-300' }}
        >
          <h3 style={{ textAlign: 'center', fontSize: '42px'}}>Roman Numeral Converter</h3>
          <Form
            onSubmit={e => {
              e.preventDefault();
              handleConversion();
            }}
          >
            <TextField
              value={integer}
              onChange={setInteger}
              label="Enter a number"
              width="100%"
              marginBottom="size-200"
            />
          </Form>
          <View marginTop="size-200">
            <Button
              UNSAFE_style={{ fontFamily: 'Times New Roman' }}
              onPress={handleConversion}
              width="100%"
              marginBottom="size-200"
              variant="primary"
              isDisabled={!integer}
            >
              Convert to Roman Numeral
            </Button>
          </View>
          {error && <p style={{ color: 'red', textAlign: 'center', fontFamily: 'Times New Roman' }}>{error}</p>}
          {romanNumeral && <p style={{ color: 'green', textAlign: 'center', fontFamily: 'Times New Roman', fontWeight: 'bold' }}>Roman Numeral: {romanNumeral}</p>}
        </View>
      </Flex>
    </Provider>
  );
};

export default App;
