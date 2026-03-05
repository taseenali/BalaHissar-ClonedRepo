export function smoothScrollTo(targetId: string, duration: number = 1000) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    // Apply an 80px offset to accommodate the sticky header (matches scroll-mt-20)
    const offset = 80;
    const distance = targetPosition - startPosition - offset;
    let startTime: number | null = null;

    function animation(currentTime: number) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const process = Math.min(timeElapsed / duration, 1);

        // Ease In Out Quart - gives a very pronounced "slide" effect
        const ease = process < 0.5
            ? 8 * process * process * process * process
            : 1 - Math.pow(-2 * process + 2, 4) / 2;

        window.scrollTo(0, startPosition + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}
