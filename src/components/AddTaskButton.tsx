type Props = {
    onClick: () => void;
};

export default function AddTaskButton({ onClick }: Props) {
    return (
        <button className="add-btn" onClick={onClick}>
            <span>+</span> Add
        </button>
    );
}
