import { Icon } from '@plone/volto/components';
import cx from 'classnames';
import React from 'react';
import AnimateHeight from 'react-animate-height';
import { Accordion, Input } from 'semantic-ui-react';
// import config from '@plone/volto/registry';
import upSVG from '@plone/volto/icons/up-key.svg';
import downSVG from '@plone/volto/icons/down-key.svg';

export default (props) => {
  const {
    children,
    handleTitleChange,
    handleTitleClick,
    uid,
    panel,
    data,
    index,
  } = props;
  const [activeIndex, setActiveIndex] = React.useState([0]);
  // const { titleIcons } = config.blocks.blocksConfig.accordion;

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
    <Accordion className={`pane-${index}`} fluid styled>
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
          aria-label={`svg-icon-${index}`}
        >
          {isExclusive(index) ? (
            <Icon name={upSVG} size="38px" />
          ) : (
            <Icon name={downSVG} size="38px" />
          )}
          {!data.readOnlyTitles ? (
            <Input
              fluid
              className="input-accordion-title"
              transparent
              placeholder="Enter Title"
              aria-label={`pane-title-${index}`}
              value={panel?.title || ''}
              onClick={(e) => {
                handleTitleClick();
                e.stopPropagation();
              }}
              onChange={(e) => handleTitleChange(e, [uid, panel])}
            />
          ) : (
            <span>{panel?.title}</span>
          )}
        </Accordion.Title>
        <AnimateHeight
          animateOpacity
          duration={500}
          height={isExclusive(index) ? 'auto' : 0}
        >
          <Accordion.Content active={true}>{children}</Accordion.Content>
        </AnimateHeight>
      </React.Fragment>
    </Accordion>
  );
};
