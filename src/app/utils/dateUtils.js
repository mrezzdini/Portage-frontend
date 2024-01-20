/**
 * Class to handle date operations
 *
 * @author Peter Mollet
 */
class DateUtils {
    static toStringFr(date) {
        return date.toLocaleDateString('fr-FR');
    }
    static toBeautifyStringFr(date) {
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }
}

export default DateUtils;
