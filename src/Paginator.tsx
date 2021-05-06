import React from "react";
import {IPaginatorProps} from "./TableGenerator";
import classNames from "classnames";

const Paginator: React.FC<IPaginatorProps> = (props) => {

	function onLimitChange(e): void {
		if (!e?.target?.value) {
			return;
		}

		props.onLimitChange(parseInt(e.target.value));
	}

	function onGoToFirst(): void {
		if (!props.enableGoPrevious) {
			return;
		}

		props.onLimitChange(0);
	}

	function onGoPrevious(): void {
		if (!props.enableGoPrevious) {
			return;
		}

		props.onLimitChange(props.currentOffset - 1);
	}

	function onGoNext(): void {
		if (!props.enableGoNext) {
			return;
		}

		props.onLimitChange(props.currentOffset + 1);
	}

	function onGoToLast(): void {
		if (!props.enableGoNext) {
			return;
		}

		props.onLimitChange(Math.floor(props.total / props.currentLimit));
	}

	function onOffsetChange(selectedOffset: number): () => void {
		return () => {
			if (selectedOffset === props.currentOffset) {
				return;
			}

			props.onLimitChange(selectedOffset);
		}
	}

	return (
		<div className="pagination-main-container">
			<div className="pagination-limit-container">
				<select
					onChange={onLimitChange}
					value={props.currentLimit}
				>
					{props.limitOptions?.map((_limitOption: number) => {
						return (
							<option value={_limitOption}>{_limitOption.toString()}</option>
						);
					})}
				</select>

				{props.limitLabel && (
					<span>
						{props.limitLabel}
					</span>
				)}
			</div>

			<div className="pagination-controls-container">
				{props.showGoToFirstButton && (
					<span
						className={classNames({"selectable-offset": props.enableGoPrevious})}
						onClick={onGoToFirst}
					>
						First
					</span>
				)}

				<span
					className={classNames({"selectable-offset": props.enableGoPrevious})}
					onClick={onGoPrevious}
				>
					{"❮"}
				</span>

				{props.availableOffsets?.map((_offset: number) => {
					return (
						<span
							className={classNames({"selected-page": _offset === props.currentOffset, "selectable-offset": _offset !== props.currentOffset})}
							onClick={onOffsetChange(_offset)}
						>
							{(_offset + 1).toString()}
						</span>
					);
				})}

				<span
					className={classNames({"selectable-offset": props.enableGoNext})}
					onClick={onGoNext}
				>
					{"❯"}
				</span>

				{props.showGoToLastButton && (
					<span
						className={classNames({"selectable-offset": props.enableGoNext})}
						onClick={onGoToLast}
					>
						Last
					</span>
				)}
			</div>
		</div>
	);
};

Paginator.defaultProps = {
	show: false,
	showGoToFirstButton: true,
	showGoToLastButton: true,
};

export default Paginator;
