class Test1 {
    private static void printTriangle(int n) {
        for (int i = 1; i <= n; i++) {
            System.out.print(" ".repeat(n-i));
            System.out.print(" *".repeat(i));
            System.out.println();
        }
    }

    public static void main(String[] args) {
        printTriangle(3);
    }
}
