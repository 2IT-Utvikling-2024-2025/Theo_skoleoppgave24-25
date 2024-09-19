
export default function B({ number }) {
    const isEven = (num) => {
        return num % 2 === 0;
    };

    return (
        <>
            {isEven(3) ? (
                <p>{number} Partall</p>
            ) : (
                <p>{number} Oddetall</p>
            )}
        </>
    );
}