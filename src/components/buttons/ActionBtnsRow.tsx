import React from 'react';
import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {styles} from '../../constants/globalStyle';
import {Colors} from '../../constants/colors';
import EditCancelBtn from './EditCancelBtn';
interface ActionButtonsRowProps {
  focusedText: string;
  loading: boolean;
  onCancel: () => void;
  onEdit: () => void;
  onSubmit: () => void;
}

const ActionBtnsRow: React.FC<ActionButtonsRowProps> = ({
  focusedText,
  loading,
  onCancel,
  onEdit,
  onSubmit,
}) => {
  return (
    <View
      style={[
        styles.flexRow,
        styles.horizantalyBetween,
        {backgroundColor: Colors.inputbg, padding: 12},
      ]}>
      <EditCancelBtn
        focusedText={focusedText}
        onCancel={onCancel}
        onEdit={onEdit}
        label="Edit Profile"
      />
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
              {color: focusedText === 'done' ? 'green' : Colors.textclr},
            ]}>
            Done
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ActionBtnsRow;
