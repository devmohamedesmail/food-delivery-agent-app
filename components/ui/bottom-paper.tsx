import React, { forwardRef, useMemo } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useTheme } from '@/context/theme-provider';
import Colors from '@/constants/Colors';

type BottomPaperProps = {
  children: React.ReactNode;
  snapPoints?: (string | number)[];
};

const BottomPaper = forwardRef<BottomSheet, BottomPaperProps>(
  ({ children, snapPoints = ['40%'] }, ref) => {
      const memoSnapPoints = useMemo(() => snapPoints, [snapPoints]);
      const { theme, setTheme } = useTheme();
      const activeColors = Colors[theme];
   

    return (
       <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={memoSnapPoints}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: activeColors.background,
        }}
        handleIndicatorStyle={{
          backgroundColor: activeColors.tabIconDefault,
        }}
      >
        <BottomSheetView style={{ flex: 1 }}>
          {children}
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

export default BottomPaper;





