// ActionButtonsRow.tsx

import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, } from 'react-native';
import { styles } from '../../constants/GlobalStyle';
import { Colors } from '../../constants/Colors';


interface ActionButtonsRowProps {
  focusedText: string;
  loading: boolean;
  onCancel: () => void;
  onEdit: () => void;
  onSubmit: () => void;
}

const ActionBtnsRow: React.FC<ActionButtonsRowProps> = ({ focusedText, loading, onCancel, onEdit, onSubmit }) => {
  return (
    <View style={[styles.flexRow, styles.horizantalyBetween, { backgroundColor: Colors.inputbg, padding: 12 }]}>
      <TouchableOpacity onPress={onCancel}>
        <Text
          style={[
            styles.fontSm,
            styles.fontWeightM,
            styles.lineHightFirst,
            styles.SpacingExSm,
            { color: focusedText === 'cancel' ? 'red' : Colors.textclr }
          ]}
        >
          Cancel
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onEdit}>
        <Text
          style={[
            styles.fontM,
            styles.fontWeightXl,
            styles.SpacingM,
            { color: focusedText === 'edit' ? 'blue' : Colors.textclr }
          ]}
        >
          Edit Profile
        </Text>
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator size="small" color={Colors.primary} />
      ) : (
        <TouchableOpacity onPress={onSubmit}>
          <Text
            style={[
              styles.fontSm,
              styles.fontWeightM,
              styles.lineHightFirst,
              styles.SpacingExSm,
              { color: focusedText === 'done' ? 'green' : Colors.textclr }
            ]}
          >
            Done
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ActionBtnsRow;
