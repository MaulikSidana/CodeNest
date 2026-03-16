#include <bits/stdc++.h>
using namespace std;

int main() {
    int N;
    cin >> N;

    int current = 0, maxLen = 0;

    for (int i = 0; i < N; i++) {
        int x;
        cin >> x;

        if (x == 1) {
            current++;
            maxLen = max(maxLen, current);
        } else {
            current = 0;
        }
    }

    cout << maxLen << endl;
    return 0;
}
