class Test1 {
    private static void printTriangle(int n) {
        for (int i = 1; i <= n; i++) {
            for (int k = 0; k < n-i; k++) {
                System.out.print(" ");
            }
            for (int k = 0; k < i; k++) {
                System.out.print("*");
                if (k != i - 1) {
                    System.out.print(" ");
                }
            }
            System.out.println();
        }
    }

    public static void main(String[] args) {
        printTriangle(3);
    }
}