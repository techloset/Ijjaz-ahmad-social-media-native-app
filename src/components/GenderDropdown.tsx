import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';

const GenderDropdown = ({ onSelect }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);

  const genders = ['Male', 'Female', 'Other'];

  const handleSelect = (gender) => {
    setSelectedGender(gender);
    onSelect(gender);
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowDropdown(true)} style={styles.button}>
        <Text>{selectedGender || 'Select gender'}</Text>
      </TouchableOpacity>
      <Modal
        visible={showDropdown}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDropdown(false)}
      >
        <View style={styles.modal}>
          {genders.map((gender, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => handleSelect(gender)}
            >
              <Text>{gender}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
});

export default GenderDropdown;
