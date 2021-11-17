import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import Button from 'verdaccio-ui/components/Button';
import CardActions from 'verdaccio-ui/components/CardActions';
import CardContent from 'verdaccio-ui/components/CardContent';
import CopyToClipBoard from 'verdaccio-ui/components/CopyToClipBoard';
import { default as Typography } from 'verdaccio-ui/components/Heading';
import Text from 'verdaccio-ui/components/Text';
import { useConfig } from 'verdaccio-ui/providers/config';

import { CardStyled as Card, HelpTitle } from './styles';

function renderHeadingClipboardSegments(title: string, text: string): React.ReactNode {
  return (
    <Fragment>
      <Text variant={'body1'}>{title}</Text>
      <CopyToClipBoard text={text} />
    </Fragment>
  );
}

const Help: React.FC = () => {
  const { configOptions } = useConfig();
  const registryUrl = configOptions.base;
  const { t } = useTranslation();

  return (
    <Card id="help-card">
      <CardContent>
        <Typography gutterBottom={true} id="help-card__title" variant="h5">
          {'🌵 Welcome to the Needle Package Registry!'}
        </Typography>
        <HelpTitle color="textSecondary" gutterBottom={true}>
          {'Please log in with your GitHub account.'}
        </HelpTitle>
        <HelpTitle color="textSecondary" gutterBottom={true}>
          {"After logging in, you'll receive a token to authenticate in Unity Package Manager."}
        </HelpTitle>
      </CardContent>
      <CardActions>
        <Button color="primary" href="https://needle.tools" size="small">
          {'Learn more at needle.tools'}
        </Button>
      </CardActions>
    </Card>
  );
};

// {renderHeadingClipboardSegments(t('help.first-step'), t('help.first-step-command-line', { registryUrl }))}
// {renderHeadingClipboardSegments(t('help.second-step'), t('help.second-step-command-line', { registryUrl }))}

export default Help;
