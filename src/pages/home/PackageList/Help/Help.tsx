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

interface Props {
  isUserLoggedIn: boolean;
}

const Help: React.FC<Props> = ({ isUserLoggedIn }) => {
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
          {!isUserLoggedIn ? (
            'Please log in with your GitHub account.'
          ) : (
            <>
              <ol>
                <li>{'Open "Project Setttings/Package Manager"'}</li>
                <li>{'Add the Needle registry and scope: https://packages.needle.tools, com.needle'}</li>
                <li>
                  {'Add '}
                  <a href="https://packages.needle.tools/-/web/detail/com.needle.package-credentials">
                    {'com.needle.package-credentials'}
                  </a>
                  {' to your project'}
                </li>
                <li>{'Click the INFO button and copy the _authToken line'}</li>
                <li>{'Open "Project Settings/Package Manager/Credentials" and add your auth information there.'}</li>
              </ol>
            </>
          )}
        </HelpTitle>
        <HelpTitle color="textSecondary" gutterBottom={false}>
          {!isUserLoggedIn
            ? "After logging in, you'll receive a token to authenticate in Unity Package Manager through the Needle Credentials package."
            : "You'll now have access to packages according to your GitHub access rights — the same set of packages that you can see on this site."}
        </HelpTitle>
      </CardContent>
      <CardActions>
        <Button color="primary" href="https://fwd.needle.tools/auth-help" size="small">
          {'Learn More • Get Help • Support'}
        </Button>
      </CardActions>
    </Card>
  );
};

// {renderHeadingClipboardSegments(t('help.first-step'), t('help.first-step-command-line', { registryUrl }))}
// {renderHeadingClipboardSegments(t('help.second-step'), t('help.second-step-command-line', { registryUrl }))}

export default Help;
