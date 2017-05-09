using UnityEngine;
using System.Collections;

public class Rotate : MonoBehaviour {
    public float spinspeed;
    public int axis;

    void Start () {}
    void Update () {
        if (axis == 0)
        {
            transform.Rotate(Vector3.up * Time.deltaTime * spinspeed, Space.World);
        } else if (axis == 1)
        {
            transform.Rotate(Vector3.right * Time.deltaTime * spinspeed, Space.World);
        } else if (axis == 2)
        {
            transform.Rotate(Vector3.forward * Time.deltaTime * spinspeed, Space.World);
        }

    }
}