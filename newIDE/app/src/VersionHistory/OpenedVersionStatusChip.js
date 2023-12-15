// @flow

import * as React from 'react';
import { I18n } from '@lingui/react';

import type { VersionRestoringStatus } from '.';
import { type FilledCloudProjectVersion } from '../Utils/GDevelopServices/Project';
import type { GDevelopTheme } from '../UI/Theme';
import Text from '../UI/Text';
import GDevelopThemeContext from '../UI/Theme/GDevelopThemeContext';
import ButtonBase from '@material-ui/core/ButtonBase';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Cross from '../UI/CustomSvgIcons/Cross';
import History from '../UI/CustomSvgIcons/History';
import { Spacer } from '../UI/Grid';

const getStatusColor = (
  gdevelopTheme: GDevelopTheme,
  status: VersionRestoringStatus
) => {
  return status === 'unsavedChanges'
    ? gdevelopTheme.statusIndicator.error
    : status === 'saving'
    ? gdevelopTheme.statusIndicator.warning
    : status === 'opened'
    ? gdevelopTheme.statusIndicator.warning
    : gdevelopTheme.statusIndicator.success;
};

const styles = {
  chip: {
    display: 'flex',
    alignItems: 'center',
    padding: 4,
    borderRadius: 6,
    color: '#111111',
  },
};

const useStylesCloseIconButton = makeStyles(theme =>
  createStyles({
    root: {
      borderRadius: 3,
      '&:hover': {
        backdropFilter: 'brightness(0.8)',
      },
    },
  })
);

type Props = {|
  openedVersion: ?FilledCloudProjectVersion,
  status: ?VersionRestoringStatus,
  onClickClose: () => void,
|};

const OpenedVersionStatusChip = ({
  openedVersion,
  status,
  onClickClose,
}: Props) => {
  const gdevelopTheme = React.useContext(GDevelopThemeContext);
  const classes = useStylesCloseIconButton();
  if (!openedVersion || !status) return null;
  return (
    <I18n>
      {({ i18n }) => (
        <div
          style={{
            ...styles.chip,
            backgroundColor: getStatusColor(gdevelopTheme, status),
          }}
        >
          <History />
          <Spacer />
          <Text noMargin color="inherit">
            {i18n.date(Date.parse(openedVersion.createdAt), {
              dateStyle: 'medium',
              timeStyle: 'short',
            })}
          </Text>
          <Spacer />
          <ButtonBase classes={classes} onClick={onClickClose}>
            <Cross />
          </ButtonBase>
        </div>
      )}
    </I18n>
  );
};

export default OpenedVersionStatusChip;
