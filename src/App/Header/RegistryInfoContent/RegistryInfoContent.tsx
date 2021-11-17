import React, { useState } from 'react';

import CopyToClipBoard from 'verdaccio-ui/components/CopyToClipBoard';
import { default as Typography } from 'verdaccio-ui/components/Heading';
import Tab from 'verdaccio-ui/components/Tab';
import Tabs from 'verdaccio-ui/components/Tabs';
import Text from 'verdaccio-ui/components/Text';
import { getCLISetRegistry, getCLIChangePassword, getCLISetConfigRegistry } from 'verdaccio-ui/utils/cli-utils';
import { NODE_MANAGER } from 'verdaccio-ui/utils/constants';

import { CommandContainer } from './styles';
import { Props, State } from './types';

const RegistryInfoContent: React.FC<Props> = props => {
  const [tabPosition, setTabPosition] = useState<State['tabPosition']>(0);
  const handleChange = (event: React.ChangeEvent<{}>, tabPosition: number): void => {
    event.preventDefault();
    setTabPosition(tabPosition);
  };

  const renderUpmTab = (scope: string, registryUrl: string): JSX.Element => {
    return (
      <>
        <Text variant="body2">{'Registry'}</Text>
        <CopyToClipBoard text={registryUrl} />
        <Text variant="body2">{'Authentication'}</Text>
        <CopyToClipBoard text={'Copy the auth key from the NPM tab'} />
        <Text variant="body2">{'Scope(s)'}</Text>
        <CopyToClipBoard text={'com.needle'} />
      </>
    );
  };

  const renderNpmTab = (scope: string, registryUrl: string): JSX.Element => {
    return (
      <>
        <CopyToClipBoard text={getCLISetConfigRegistry(`${NODE_MANAGER.npm} set`, scope, registryUrl)} />
        <Text variant="body2">{'Paste AuthToken line into Project Settings/Credentials'}</Text>
        <CopyToClipBoard text={getCLISetRegistry(`${NODE_MANAGER.npm} adduser`, registryUrl)} />
      </>
    );
  };

  const renderPnpmTab = (scope: string, registryUrl: string): JSX.Element => {
    return (
      <>
        <CopyToClipBoard text={getCLISetConfigRegistry(`${NODE_MANAGER.pnpm} set`, scope, registryUrl)} />
        <CopyToClipBoard text={getCLISetRegistry(`${NODE_MANAGER.pnpm} adduser`, registryUrl)} />
        <CopyToClipBoard text={getCLIChangePassword(NODE_MANAGER.pnpm, registryUrl)} />
      </>
    );
  };

  const renderYarnTab = (scope: string, registryUrl: string): JSX.Element => {
    return <CopyToClipBoard text={getCLISetConfigRegistry(`${NODE_MANAGER.yarn} config set`, scope, registryUrl)} />;
  };

  const renderTabs = (): JSX.Element => {
    const { scope, registryUrl } = props;

    return (
      <>
        <Tabs
          color={'primary'}
          data-testid={'tabs-el'}
          indicatorColor={'primary'}
          onChange={handleChange}
          value={tabPosition}
          variant="fullWidth">
          <Tab data-testid={'npm-tab'} label={NODE_MANAGER.npm} />
          <Tab data-testid={'upm-tab'} label={NODE_MANAGER.upm} />
        </Tabs>
        {tabPosition === 0 && <TabContainer>{renderNpmTab(scope, registryUrl)}</TabContainer>}
        {tabPosition === 1 && <TabContainer>{renderUpmTab(scope, registryUrl)}</TabContainer>}
      </>
    );
  };

  /* eslint react/prop-types:0 */
  const TabContainer: React.FC = ({ children }): JSX.Element => {
    return (
      <CommandContainer data-testid={'tab-content'}>
        <Typography>{children}</Typography>
      </CommandContainer>
    );
  };

  return <div>{renderTabs()}</div>;
};

export default RegistryInfoContent;
