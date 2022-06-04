print('\n'.join([''.join([('love'[(x-y) % len('Love')] if ((x*0.05)**2+(y*0.1)**2-1)**3 -
      (x*0.05)**2*(y*0.1)**3 <= 0 else ' ') for x in range(-30, 30)]) for y in range(30, -30, -1)]))


# 冒泡排序
def bubble_sort(arr):
    for i in range(len(arr)):
        for j in range(len(arr)-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr


arr = [1, 2, 3, 4, 5, 6, 110, 7, 8, 9, 10]
print(bubble_sort(arr))


# 快速排序
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = arr[0]
    left = [x for x in arr[1:] if x < mid]
    right = [x for x in arr[1:] if x >= mid]
    return quick_sort(left) + [mid] + quick_sort(right)


# 斐波那契额函数
def fib(n):
    if n == 1 or n == 2:
        return 1
    return fib(n-1) + fib(n-2)
