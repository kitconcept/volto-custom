import React from 'react';
import { RenderBlocks } from '@plone/volto/components';
import {
  getPanels,
  accordionBlockHasValue,
} from '@eeacms/volto-accordion-block/components/manage/Blocks/Accordion/util';
import { Accordion } from 'semantic-ui-react';
import { withBlockExtensions } from '@plone/volto/helpers';

import cx from 'classnames';
import { Icon } from '@plone/volto/components';
import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';
import AnimateHeight from 'react-animate-height';

import '@eeacms/volto-accordion-block/components/manage/Blocks/Accordion/editor.less';

const View = (props) => {
  const { data } = props;
  const panels = getPanels(data.data);
  const metadata = props.metadata || props.properties;
  const [activeIndex, setActiveIndex] = React.useState([0]);
  const handleClick = (e, itemProps) => {
    const { index } = itemProps;
    if (data.non_exclusive) {
      const newIndex =
        activeIndex.indexOf(index) === -1
          ? [...activeIndex, index]
          : activeIndex.filter((item) => item !== index);

      setActiveIndex(newIndex);
    } else {
      const newIndex =
        activeIndex.indexOf(index) === -1
          ? [index]
          : activeIndex.filter((item) => item !== index);

      setActiveIndex(newIndex);
    }
  };

  const isExclusive = (index) => {
    return activeIndex.includes(index);
  };

  React.useEffect(() => {
    return data.collapsed ? setActiveIndex([]) : setActiveIndex([0]);
  }, [data.collapsed]);

  return (
    <div className="accordion-block">
      {data.headline && <h2 className="headline">{data.headline}</h2>}
      {panels.map(([id, panel], index) => {
        return accordionBlockHasValue(panel) ? (
          <Accordion fluid styled key={id} exclusive={!data.exclusive}>
            <React.Fragment>
              <Accordion.Title
                as={data.title_size}
                active={isExclusive(index)}
                index={index}
                onClick={handleClick}
                className={cx('accordion-title', {
                  'align-arrow-left': !props?.data?.right_arrows,
                  'align-arrow-right': props?.data?.right_arrows,
                })}
              >
                {isExclusive(index) ? (
                  <Icon name={upSVG} size="38px" />
                ) : (
                  <Icon name={downSVG} size="38px" />
                )}
                <span>{panel?.title}</span>
              </Accordion.Title>
              <AnimateHeight
                animateOpacity
                duration={500}
                height={isExclusive(index) ? 'auto' : 0}
              >
                <Accordion.Content active={true}>
                  <RenderBlocks
                    {...props}
                    metadata={metadata}
                    content={panel}
                  />
                </Accordion.Content>
              </AnimateHeight>
            </React.Fragment>
          </Accordion>
        ) : null;
      })}
    </div>
  );
};

export default withBlockExtensions(View);
